import User from "../models/userModel.js";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import asyncHandler from 'express-async-handler'
import cloudinary from "../utils/cloudinary.js";



const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: '30d',
    })
}
// register user
// post /auth/register

export const registerUser = asyncHandler(async (req, res) => {
    const {password, username, email} =  req.body
    const lowerCaseEmail = await req.body.email.toLowerCase().trimStart().trimEnd()
   
    // hash password with bcrypt
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt)

    // check if username or email have been exist in DB
    const emailExist = await User.findOne({email : lowerCaseEmail})
    console.log(emailExist)
    if (emailExist) {
        res.status(400).json('An account exist with this email')
    }
    const usernameExist = await User.findOne({username})
    if (usernameExist) {
        res.status(400).json('This username has been claimed already')
    }

    // create user
    const user = await User.create({
        firstName: req.body.firstName.trimStart().trimEnd(),
        lastName: req.body.lastName.trimStart().trimEnd(),  
        // email: req.body.email,
        email: lowerCaseEmail, 
        username: req.body.username.trimStart().trimEnd(),
        password: hashedPassword, 
    })

    // gen a token with the userId
    const token = generateToken(user._id)

    if (user) {
        res.status(200).json({
            firstName: user.firstName, 
            lastName: user.lastName, 
            username: user.username, 
            followers: user.followers, 
            following: user.following, 
            day: user.day,
            email: user.email,
            id: user._id,
            buddy: user.buddy,
            token})
    } else {
        res.status(400)
        throw new Error('invalid user data')
    }
})

// login user
// post /auth/login

export const loginUser = asyncHandler(async (req, res) => {
    const { password, email} = req.body
    const lowerCaseEmail = email.toLowerCase().trimEnd().trimStart()
    const user = await User.findOne({email : lowerCaseEmail})
    // compare password
    if (user && (await bcrypt.compare(password, user.password))) {
        const token = generateToken(user._id)
        res.json({
            firstName: user.firstName, 
            lastName: user.lastName, 
            username: user.username, 
            followers: user.followers, 
            following: user.following, 
            email: user.email,
            profileImage: user.profileImage,
            id: user._id,
            day: user.day,
            aboutMe: user.aboutMe,
            buddy: user.buddy, 
            day: user.day,
            token})
    } else {
        res.status(400).json('Incorrect username, email or password')
    }
})


export const updateUser = asyncHandler(async (req, res) => {
    const id =  req.user.id
    const {firstName, lastName, username, email, aboutMe} = req.body
    const user = await User.findById(id)
    if(user.username.toString() === username.toString()) {
        await user.updateOne({firstName, lastName , aboutMe})  
    } else{
        await user.updateOne({firstName, lastName, aboutMe, username})
    }
    if(user.email.toString() !== email.toString()){
        await user.updateOne({email})
    }
    const updatedUser = await User.findById(id)
    if(user){
        const token = generateToken(user._id)
        res.status(200).json({
            firstName: updatedUser.firstName, 
            lastName: updatedUser.lastName, 
            username: updatedUser.username,
            followers: updatedUser.followers, 
            following: updatedUser.following, 
            email: updatedUser.email,
            profileImage: updatedUser.profileImage,
            id: updatedUser._id,
            day: updatedUser.day,
            aboutMe: updatedUser.aboutMe,
            currentBook: updatedUser.currentBook,
            buddy: updatedUser.buddy,
            token})
    } else {
        res.status(400).json('Cant find user')
    }
})

export const uploadProfilePicture = asyncHandler(async(req, res) => {
    const userId = req.user.id
    const profileImage = req.body.profileImage
    const user = await User.findById(userId)
    await user.updateOne({profileImage})
    const updatedUser = await User.findById(userId)
    console.log(user)
    if (!user){
        res.status(400).json('user does not exist')
    }
    res.status(200).json(updatedUser)
})


export const updateProfilePicture = asyncHandler(async (req, res) => {
    const userId = req.user.id
    const fileStr = req.body.data;
    const uploadedResponse = await cloudinary.uploader.upload(fileStr, {upload_preset: 'dev_setups'})


    if(!uploadedResponse) {
        res.status(400).json('Image not uploaded')
    } 
    const user = await User.findById(userId)
    await user.updateOne({profileImage:uploadedResponse.url})
    res.status(200).json(uploadedResponse.url)
})


