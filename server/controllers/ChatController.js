import User from "../models/userModel.js";
import Chat from '../models/chatModel.js'
import Message from '../models/messagesModel.js'
import asyncHandler from 'express-async-handler'

export const createChat = asyncHandler(async (req, res)=> {
    const userId = req.user.id
    const secondUser = req.body.userId
    const existingChat = await Chat.find({
       users:{$all:[userId, secondUser]}
    })
    if(existingChat.length === 0){
        const chat = await Chat.create({
            users: [userId, secondUser]
            })
            if(!secondUser){
               res.status(400).json('Please include a user')
            } else {
                console.log(chat)
                res.status(200).json(chat)
            }
    }
    console.log(existingChat)
    res.status(200).json(existingChat)
})


// const poster = await Post.find({
//         $or: [
//             {userId:{$in:req.user.following}},
//             {userId: req.user._id}
//         ]
//     }).populate("userId","firstName username profileImage")
//     .populate({path: 'comments', populate: {path: 'userId', select: '-password'}})
//     .sort('-createdAt')

// const chat = await Chat.create({
//     users: [userId, secondUser]
//     })
//     if(!secondUser){
//        res.status(400).json('Please include a user')
//     }