import Notifications from '../models/notificationsModel.js'
import asyncHandler from 'express-async-handler'
import mongoose from 'mongoose'

// get notifications
export const getNotifications = asyncHandler(async (req, res) => {
    const userId = req.user.id
    const notifications = await Notifications.find({userId}).populate('sender', '-password')
    const reverseNotifications = notifications.reverse()
    if(!notifications){
        res.status(400).json('No notifications found')
    } 
    res.status(200).json(reverseNotifications)
})

export const setReadNotifications = asyncHandler(async (req, res) => {
    const notificationsId = req.params.id
    const notification = await Notifications.findById(notificationsId)
    console.log(notification)
    await notification.updateOne({read: true,})
    if(!notification){
        res.status(400).json('No notifications exist')
    }
    res.status(200).json('Notifications set to read')
})