import mongoose from 'mongoose'
const {ObjectId} = mongoose.Schema.Types

const MessageSchema = mongoose.Schema({
    chatId: {
        type: ObjectId, ref:'Chat'
    },
    userId: {
        type: ObjectId, ref:'User'
    }, 
    message: {
        type: String,
    }, 
    createdAt: {
        type: Date, 
        default: new Date()
    }
}, {
    timestamp: true,
})

const MessageModel = mongoose.model('Message', MessageSchema);
export default MessageModel;