import mongoose from 'mongoose'
const {ObjectId} = mongoose.Schema.Types


const ChatSchema = mongoose.Schema({
    users: [{type: ObjectId, ref:'User'}],
}, 
{
    timestamps: true, 
})

const ChatModel =  mongoose.model("Chat", ChatSchema);
export default ChatModel;

