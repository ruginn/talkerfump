import mongoose from 'mongoose';
const {ObjectId} = mongoose.Schema.Types

const postSchema = mongoose.Schema({
    postText: {
        type: String, 
        required: true
    }, 
    book: {
        title:{ 
            type: String, 
        },
        author: {
            type: String, 
        },
        pages: {
          type: Number,   
        }
    }, 
    workout1: {
        exercise:{
            type: String, 
        },
        duration: {
            type: Number,
        }
    }, 
    workout2: {
        exercise:{
            type: String, 
        },
        duration: {
            type: Number,
        }
    }, 
    progressPhoto: {
        photo: {
            type: String, 
        }, 
        privatePhoto: {
            type: Boolean
        }
    }, 
    alcohol: {
        type: Boolean, 
    }, 
    cleanEat: {
        type: Boolean, 
    },
    water: {
        type: Boolean
    }, 
    userId: {
        type: ObjectId, 
        ref:'User',
        required: true
    }, 
    streak: {
        type: Number,
    }, 
    likes: [{type: ObjectId, ref:'User'}], 
    comments: [{type: ObjectId, ref: 'Comment'}], 
    createdAt : {
        type: Date, 
        default: new Date()
    }, 
    mDate: {
        type: Date, 
    }
}, 
{
    timeStamp: true
})

const PostModel = mongoose.model('Post', postSchema)

export default PostModel;