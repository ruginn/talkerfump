import mongoose from 'mongoose';
const {ObjectId} = mongoose.Schema.Types

const postSchema = mongoose.Schema({
    postText: {
        type: String, 
        required: true
    }, 
    userId: {
        type: ObjectId, 
        ref:'User',
        required: true
    }, 
    likes: [{type: ObjectId, ref:'User'}], 
    comments: [{type: ObjectId, ref: 'Comment'}], 
    createdAt : {
        type: Date, 
        default: new Date()
    }
}, 
{
    timeStamp: true
})

const PostModel = mongoose.model('Post', postSchema)

export default PostModel;