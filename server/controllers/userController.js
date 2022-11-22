import Post from "../models/postModel.js";
import User from "../models/userModel.js";
import Comment from '../models/commentModel.js'
import asyncHandler from "express-async-handler";
import Notification from '../models/notificationsModel.js'
import mongoose from "mongoose";


// find all users
export const findAllUsers = asyncHandler(async (req, res) => {
    const users =  await User.find()
    if(!users) {
        res.status(400).json('no users found')
    }
    res.status(200).json(users)
})

//find user 
export const findUser = asyncHandler(async(req, res) => {
    const userId = req.params.id
    const user = await User.findById(userId)
    if(!user){
        res.status(400).json('user not found')
    }
    res.status(200).json(user)
})

// find user post 
export const findUserPosts = asyncHandler(async(req, res) => {
    const userId = req.params.id
    const posts = await Post.find({userId}).populate('userId', '-password').populate({path: 'comments', populate: {path: 'userId', select: '-password'}})
    const reversePost = posts.reverse()
    if(!posts){
        res.status(400).json('no posts found')
    }
    res.status(200).json(reversePost)
})

// follow user
export const followUser = asyncHandler(async(req, res)=> {
    const followerId = req.params.id
    const currentId = req.user.id
    if(followerId === currentId){
        res.status(403).json('Action forbidden. You can not follow yourself')
    } else{
        const followingUser = await User.findById(followerId)
        const currentUser = await User.findById(currentId)
        if(!followingUser) {
            res.status(400).json('User not found')
        }
        if (!followingUser.followers.includes(currentId)) {
            await followingUser.updateOne({$push: {followers: currentId}})
            await currentUser.updateOne({$push: {following: followerId}})
            const returnMe = await User.findById(followerId) 
            await Notification.create({
                sender: currentId, 
                userId: followerId, 
                event: 'Followed', 
                content: `is now following you!`, 
            })
            res.status(200).json(returnMe)
        } else {
            res.status(400).json('You are already following this user')
        }
    }
})

// unfollow user
export const unfollowUser = asyncHandler(async(req, res)=> {
    const followerId = req.params.id
    const currentId = req.user.id
    if(followerId === currentId){
        res.status(403).json('Action forbidden. You can not unfollow yourself')
    } else {
        const followingUser = await User.findById(followerId)
        const currentUser = await User.findById(currentId)
        if(!followingUser) {
            res.status(400).json('User not found')
        }
        if (followingUser.followers.includes(currentId)) {
            await followingUser.updateOne({$pull: {followers: currentId}})
            await currentUser.updateOne({$pull: {following: followerId}})
            const returnMe = await User.findById(followerId)
            res.status(200).json(returnMe)
        } else {
            res.status(400).json('You are already unfollowing this user')
        }
    }
})

export const findFollowers = asyncHandler(async (req, res) => {
    const userId = req.params.id 
    const user = await User.findById(userId).populate('followers', '-password' )
    if(!user) {
        res.status(400).json(`Followers not found ${userId}`)
    } 
    res.status(200).json(user)

})

export const findFollowing = asyncHandler(async (req, res) => {
    const userId = req.params.id 
    const user = await User.findById(userId).populate('following', '-password' )
    if(!user) {
        res.status(400).json(`Following not found ${userId}`)
    } 
    res.status(200).json(user)

})

// connect with accountability buddy
export const getPartner = asyncHandler(async(req, res) => {
    const userId = req.user.id 
    console.log(userId + 'userId')
    const user = await User.findById(userId)
    console.log(user + 'user')
    if (user.buddy){
        res.status(403).json('Unauthorized, you already have a buddy')
    } else{

    await user.updateOne({buddySearch: true})
    const eligibleBuddy = await User.find({buddySearch: true})
    console.log('this is eb')
    console.log(eligibleBuddy)
    console.log('this is end of eb')
    let partner = ''
    if (eligibleBuddy.length === 1){
        res.status(200).json('You have been opted into the buddy search')
    } else {
        partner = eligibleBuddy[Math.floor(Math.random() * eligibleBuddy.length)]
        if (partner._id.toString() === userId){
            while(userId === partner._id.toString()){
                partner = eligibleBuddy[Math.floor(Math.random() * eligibleBuddy.length)]
            }
        }    
        const matched = await User.findById(partner._id)
        await matched.updateOne({buddySearch: false, buddy: user})
        await user.updateOne({buddySearch: false, buddy: partner}) 
    }
    res.status(200).json(partner._id) 
    }
})

// search users
export const searchUser = asyncHandler(async(req, res) => {
    const para = req.body.para
    console.log(req)
    const regexPara = new RegExp("^"+para, 'i')
    // const user = await User.find({firstName: para, lastName: para, username: para })
    const user = await User.find({
        $or: [
            {firstName: {$regex:regexPara}},
            {lastName: {$regex:regexPara}},
            {username: {$regex:regexPara}},
        ]
    })
    if(!user){
        res.status(400).json('No users found')
    }
    res.status(200).json(user)
})


// const poster = await Post.find({
//     $or: [
//         {userId:{$in:req.user.following}},
//         {userId: req.user._id}
//     ]
// })