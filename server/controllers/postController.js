import Post from "../models/postModel.js";
import User from "../models/userModel.js";
import Comment from '../models/commentModel.js'
import asyncHandler from "express-async-handler";
import { json } from "express";

export const createPost = asyncHandler(async (req, res) => {
    const {postText, userId} = req.body

    const post = await Post.create({
        postText, 
        userId
    })
    res.status(200).json({post})
    if (!postText) {
        res.status(400).json('Please enter a post')
    }
})

export const getPost = asyncHandler(async(req, res) =>{
    const {id} = req.params
    const post = await Post.findById(id)
    if(!post){
        res.status(400).json('Post not found')
    }
    res.status(200).json(post)
})

export const deletePost = asyncHandler(async(req, res)=> {
    const {id} = req.params;
    const {userId} = req.body;

    const post = await Post.findById(id)
    if (post.userId.toString() === userId) {
        post.remove()
        res.status(200).json('Post deleted')
    } else{
        res.status(403).json('Authentication failed')
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
    const {userId} = req.body;

    const post = await Post.findById(id)
    if(!post){
        res.status(400).json('Post not found')
    }
    if (post.likes.includes(userId)) {
        await post.updateOne({$pull: {likes: userId}});
        res.status(200).json("Post unliked")
    } else {
        await post.updateOne({$push: {likes: userId}})
        res.status(200).json("Post liked")
    }
})

// comment on a post

export const commentPost = asyncHandler(async(req, res) => {
    const {commentText} = req.body
    const postId = req.params.id
    if (!commentText) {
        res.status(400).json('Enter a comment')
    }
    const comment = await Comment.create({
        commentText, 
        postId
    })
    const post = await Post.findById(postId)
    await post.updateOne({$push : {comments: comment._id}}, {new: true})
    res.status(200).json(post)
})