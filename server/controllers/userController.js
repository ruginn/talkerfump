import Post from "../models/postModel.js";
import User from "../models/userModel.js";
import Comment from '../models/commentModel.js'
import asyncHandler from "express-async-handler";
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


