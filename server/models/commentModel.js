import mongoose from 'mongoose'
const {ObjectId} = mongoose.Schema.Types

const commentSchema = mongoose.Schema({
    postId: {
        type: ObjectId, 
        ref: 'Post', 
        required: true
    }, 
    userId: {
        type: ObjectId, 
        ref: 'User', 
        required: true
    },
    likes: [{type: ObjectId, ref:'User'}], 
    commentText: {
        type: String, 
        required: true, 
    }, 
    createdAt: {
        type: Date, 
        default: new Date()
    }
}, 
{
    timeStamp: true
})

const CommentModel = mongoose.model('Comment', commentSchema)

export default CommentModel