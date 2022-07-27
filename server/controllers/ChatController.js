import User from "../models/userModel.js";
import Chat from '../models/chatModel.js'
import Message from '../models/messagesModel.js'
import asyncHandler from 'express-async-handler'

export const createChat = asyncHandler(async (req, res)=> {
    const userId = req.user.id
    const secondUser = req.body.userId
    if(!secondUser) {
        res.status(400).json('please add a second user')
    }
    const existingChat = await Chat.find({
       users:{$all:[userId, secondUser]}
    }).populate('users', 'username profileImage')
    if(existingChat.length === 0){
        const chat = await Chat.create({
            users: [userId, secondUser]
            })       
        const updated = await chat.populate('users', 'username profileImage')
        res.status(200).json(updated)        
    } else{
    res.status(200).json(existingChat)
    }
})



export const getUserChats = asyncHandler(async (req, res) => {
    const userId = req.user.id
    const chats = await Chat.find({
        users: {$in:[userId]}
    }).populate('users', 'username profileImage')
    if(!chats){
        res.status(400).json('No chats found')
    }
    res.status(200).json(chats)
})

// find chat with ID

export const findChat = asyncHandler(async (req, res) => {
    const chatId = req.params.id
    const chat = await Chat.findById(chatId).populate('users', 'username profileImage')
    if(!chat){
        res.status(400).json('Chat not found')
    }
    res.status(200).json(chat)
})


export const createMessage = asyncHandler(async (req, res) => {
    const chatId = req.params.id
    const message = req.body.message
    const createdAt = req.body.createdAt
    const userId = req.user.id
    const chatMessage = await Message.create({
        chatId, 
        userId, 
        message, 
        createdAt
    })
    if(!message || !chatId ||!userId) {
        res.status(400).json('Missing information')
    }
    res.status(200).json(chatMessage)
})


export const getMessages = asyncHandler(async (req, res) => {
    const chatId = req.params.id
    const messages = await Message.find({chatId}).populate('userId', 'username profileImage').sort('createdAt')
    if(!messages) {
        res.status(400).json('No messages')
    }
    res.status(200).json(messages)
})