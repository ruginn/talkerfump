import User from "../models/userModel.js";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import asyncHandler from 'express-async-handler'



const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: '30d',
    })
}
// register user
// post /auth/register

export const registerUser = asyncHandler(async (req, res) => {
    const {password, username, email} =  req.body
    // hash password with bcrypt
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt)

    // check if username or email have been exist in DB
    const emailExist = await User.findOne({email})
    if (emailExist) {
        res.status(400).json('An account exist with this email')
    }
    const usernameExist = await User.findOne({username})
    if (usernameExist) {
        res.status(400).json('This username has been claimed already')
    }

    // create user
    const user = await User.create({
        firstName: req.body.firstName, 
        email: req.body.email, 
        username: req.body.username,
        password: hashedPassword, 
    })

    // gen a token with the userId
    const token = generateToken(user._id)

    if (user) {
        res.status(200).json({
            user, token})
    } else {
        res.status(400)
        throw new Error('invalid user data')
    }
})

// login user
// post /auth/login

export const loginUser = asyncHandler(async (req, res) => {
    const { password, email} = req.body
    const user = await User.findOne({email})
    // compare password
    if (user && (await bcrypt.compare(password, user.password))) {
        const token = generateToken(user._id)
        res.json({user, token})
    } else {
        res.status(400).json('Incorrect username, email or password')
    }
})
