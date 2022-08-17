import mongoose from 'mongoose'
const {ObjectId} = mongoose.Schema.Types

const notificationSchema = mongoose.Schema({
    sender: {
        type: ObjectId, 
        ref: 'User', 
        required: true
    }, 
    userId: {
        type: ObjectId, 
        ref: 'User', 
        required: true
    }, 
    event: {
        type: String
    },
    content: {
        type: String
    },
    read: {
        type: Boolean, 
        default: false
    }, 
    postId: {
        type: ObjectId, 
        ref: 'Post'
    }, 
    createdAt: {
        type: Date, 
        default: new Date()
    }
}, {
    timeStamp: true
})

const NotificationModel = mongoose.model('Notification', notificationSchema)

export default NotificationModel;