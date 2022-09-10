import mongoose from 'mongoose'
const {ObjectId} = mongoose.Schema.Types

const userSchema = mongoose.Schema({
    firstName: {
        type: String, 
        required: [true, "Please add a name"]
    }, 
    lastName: {
        type: String, 
    },
    email: {
        type: String, 
        required: [true, "Please add an email"], 
        unique: true
    },
    username: {
        type: String, 
        required: [true, "Please add a username"],
        unique: true
    },
    password: {
        type: String, 
        required: [true, "Please add a password"]
    }, 
    aboutMe: {
        type: String
    }, 
    profileImage: {
        type: String
    },
    day:{
        streak:{
            type: Number, 
            default: 0, 
        }, 
        date: {
            type: Date
        }
    }, 
    buddySearch:{
        type: Boolean,
        default: false
    },
    buddy: {
        type: ObjectId, ref:"Users"
    },
    currentBook: {
        title:{ 
            type: String, 
        },
        author: {
            type: String, 
        },
        pages: {
          type: Number,   
        },
    },
    followers: [{type: ObjectId, ref:"User"}], 
    following: [{type: ObjectId, ref:"User"}]
}, 
{
    timestamps: true
})

const UserModel = mongoose.model("User", userSchema);
export default UserModel