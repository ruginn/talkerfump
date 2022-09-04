import mongoose from 'mongoose'
const {ObjectId} = mongoose.Schema.Types


const ChatSchema = mongoose.Schema({
    users: [{type: ObjectId, ref:'User'}],
    messages: [{type: ObjectId, ref:'Message'}]
}, 
{
    timestamps: true, 
})

const ChatModel =  mongoose.model("Chat", ChatSchema);
export default ChatModel;

