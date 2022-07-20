import mongoose from 'mongoose'
const {ObjectId} = mongoose.Schema.Types;

const eventSchema = new mongoose.Schema({
    event: {
        type: String,
        required: true, 
    }, 
    completed: {
        type: Boolean, 
        default: false
    }, 
    likes: [{type: ObjectId, ref:'User'}], 
    comments: [{type: ObjectId, ref: 'Comment'}], 
    createdAt : {
        type: Date, 
        default: new Date()
    }
}, 
{
    timeStamp: true, 
})

const EventModel = mongoose.model(Event, eventSchema)

export default EventModel;