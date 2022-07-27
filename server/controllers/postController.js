import Post from "../models/postModel.js";
import User from "../models/userModel.js";
import Comment from '../models/commentModel.js'
import asyncHandler from "express-async-handler";
import mongoose from "mongoose";



export const createPost = asyncHandler(async (req, res) => {
    const {postText} = req.body
    const {createdAt} = req.body
    const userId = req.user.id

    const post = await Post.create({
        postText, 
        userId,
        createdAt,
    })
    const updatedPost = await Post.findById(post._id).populate('userId')
    res.status(200).json(updatedPost)
    if (!postText) {
        res.status(400).json('Please enter a post')
    }
})

export const getPost = asyncHandler(async(req, res) =>{
    const {id} = req.params
    const post = await Post.findById(id).populate('comments')
    if(!post){
        res.status(400).json('Post not found')
    }
    res.status(200).json(post)
})

export const deletePost = asyncHandler(async(req, res)=> {
    const {id} = req.params;
    const userId = req.user.id;

    const post = await Post.findById(id)
    if (post.userId.toString() === userId) {
        post.remove()
        res.status(200).json('Post deleted')
    } else{
        res.status(403).json('Authentication failed')
        console.log(userId + '' + post.userId)
    }
})


export const updatePost = asyncHandler(async(req, res) => {
    const {id} = req.params;
    const {userId} = req.body;

    const post = await Post.findById(id)
    if(!post){
        res.status(400).json('Post not found')
    }
    if (post.userId.toString() !== userId){
        res.status(401).json('User not authorized')
    }
    const updatedPost = await Post.findByIdAndUpdate(id, req.body, {new: true})
    res.status(200).json(updatedPost)

})

// like/unlike a post

export const likePost = asyncHandler(async(req, res) =>{
    const {id} = req.params;
    const userId = req.user.id;

    const post = await Post.findById(id)
    if(!post){
        res.status(400).json('Post not found')
    }
    if (post.likes.includes(userId)) {
        await post.updateOne({$pull: {likes: userId}});
        const unlikedPost = await Post.findById(id).populate("userId","firstName username profileImage")
        .populate({path: 'comments', populate: {path: 'userId', select: '-password'}})

        res.status(200).json(unlikedPost)
    } else {
        await post.updateOne({$push: {likes: userId}})
        const likedPost = await Post.findById(id).populate("userId","firstName username profileImage")
        .populate({path: 'comments', populate: {path: 'userId', select: '-password'}})
        res.status(200).json(likedPost)
    }
})

// comment on a post

export const commentPost = asyncHandler(async(req, res) => {
    const {commentText} = req.body
    const createdAt = req.body.createdAt
    const postId = req.params.id
    const userId = req.user.id
    if (!commentText) {
        res.status(400).json('Enter a comment')
    }
    const comment = await Comment.create({
        commentText, 
        postId, 
        userId,
        createdAt,
    })
    const post = await Post.findById(postId)
    await post.updateOne({$push : {comments: comment._id,}}, {new: true})
    const updatedPost = await Post.findById(postId).populate("userId","firstName username profileImage")
    .populate({path: 'comments', populate: {path: 'userId', select: '-password'}})
    res.status(200).json(updatedPost)
})


// delete comment

export const deleteComment = asyncHandler(async(req, res)=> {
    const postId = req.params.id
    const id = req.body.commentId;
    const userId = req.user.id
    const comment = await Comment.findById(id)
    const post = await Post.findById(postId).populate("userId","firstName username profileImage")

    if(!comment){
        res.status(400).json('comment not found')
    } 
    
    if(userId.toString() === post.userId._id.toString() || userId.toString() === comment.userId._id.toString()){
        comment.remove()
        const updatedpost = await Post.findById(postId).populate("userId","firstName username profileImage")
        .populate({path: 'comments', populate: {path: 'userId', select: '-password'}})
        res.status(200).json(updatedpost) 
    } else {
        console.log('it is true')
        res.status(400).json('You are not authorized to delete this comment')
    } 
})


// like commnent
export const likeComment = asyncHandler(async(req, res) => {
    const id = req.body.commentId
    const postId = req.params.id
    const userId = req.user.id
    
    const comment = await Comment.findById(id)
    if (!comment){
        res.status(400).json('Comment not found')
    } 
    if (comment.likes.includes(userId)) {
        await comment.updateOne({$pull: {likes: userId}});
        const unlikedComment = await Post.findById(postId).populate("userId","firstName username profileImage")
        .populate({path: 'comments', populate: {path: 'userId', select: '-password'}})

        res.status(200).json(unlikedComment)
    } else {
        await comment.updateOne({$push: {likes: userId}})
        const likedComment = await Post.findById(postId).populate("userId","firstName username profileImage")
        .populate({path: 'comments', populate: {path: 'userId', select: '-password'}})
        res.status(200).json(likedComment)
    }
})


// get my post 
export const myPosts = asyncHandler(async (req, res) => {
    const userId = mongoose.Types.ObjectId(req.user._id)
    const posts = await Post.find({userId}).populate('userId', '-password')
    if (!posts) {
        res.status(400).json('posts not found')
    } else {
        res.status(200).json(posts)
    }
})


// get timeline
export const getTimelinePosts2 = async(req, res) => {
    const userId = req.params.id
    try {
        const currentUserPosts = await Post.find({userId: userId})

        const followingPosts = await User.aggregate([
            {
                $match: {
                    _id: new mongoose.Types.ObjectId(userId)
                },
            },
            {
                $lookup: {
                    from: 'posts', 
                    localField: 'following',
                    foreignField: 'userId', 
                    as: 'followingPosts'
                }
            }, 
            {
                $project: {
                    followingPosts: 1, 
                    _id: 0,
                }
            }
        ])

        console.log(followingPosts[0])

        res.status(200).json(
            currentUserPosts.concat(...followingPosts[0].followingPosts)
            .sort((a, b) => {
                return new Date(b.createAt) - new Date(a.createdAt)
            })
        )
        } catch (error){
            res.status(500).json(error)
        }
}


export const getTimelinePosts = asyncHandler(async (req,res) =>{
    // const currentUserPosts = await Post.find({userId: req.user._id})
    // .populate("userId","firstName username")
    // .sort('-createdAt')
    // const posts = await Post.find({userId:{$in:req.user.following}})
    // .populate("userId","firstName username")
    // .populate({path: 'comments', populate: {path: 'userId', select: '-password'}})
    // .sort('-createdAt')
    const poster = await Post.find({
        $or: [
            {userId:{$in:req.user.following}},
            {userId: req.user._id}
        ]
    }).populate("userId","firstName username profileImage")
    .populate({path: 'comments', populate: {path: 'userId', select: '-password'}})
    .sort('-createdAt')
    
    if (!poster) {
        res.status(400).json('posts not found')
    } else {
        res.status(200).json(poster)
    }   
})

export const getPostLikes = asyncHandler(async(req, res) => {
    const postId = req.params.id
    const likedUsers = await Post.findById(postId).populate('likes', 'profileImage username firstName _id')
    if (!likedUsers) {
        res.status(400).json('Post does not exist')
    }
    res.status(200).json(likedUsers)
})

export const getCommentLikes = asyncHandler(async(req, res) => {
    const commentId = req.params.id
    const likedUsers = await Comment.findById(commentId).populate('likes', 'profileImage username firstName _id')
    if(!commentId) {
        res.status(400).json('Could not find comment')
    }
    res.status(200).json(likedUsers)

})