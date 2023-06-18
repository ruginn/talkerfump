import axios from 'axios'

// const API_URL = '/api/auth'
const API = axios.create({baseURL: 'https://kma75.onrender.com/'})


// get all users
const getUsers = async () => {
    
    const response = await API.get(`/api/users`)
    return response.data
}

// get user
const getUser = async (userId) => {
    const response = await API.get(`/api/users/${userId}`)
    return response.data
}

//follow a user 
const followUser = async (userId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`, 
        }, 
    }
    const response = await API.put(`/api/users/${userId}/follow`, userId, config)
    return response.data
}


// unfollow user
const unfollowUser = async(userId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    }
    const response = await API.put(`/api/users/${userId}/unfollow`, userId, config)
    return response.data
}


const findFollowers = async(userId) => {
    const response = await API.get(`/api/users/${userId}/findfollowers`)
    return response.data
}

const findFollowing = async(userId) => {
    const response = await API.get(`/api/users/${userId}/findfollowing`)
    return response.data
}


const getPostLikes = async(postId) => {
    const response = await API.get(`/api/post/${postId}/getLikes`)
    return response.data.likes
}

const getCommentLikes = async(commentId) => {
    const response = await API.get(`/api/post/${commentId}/comment/getlikes`)
    console.log(response.data)
    return response.data.likes
}

const searchUser = async(para) => {
    console.log(para)
    const response = await API.put('/api/users/search', para, para)
    return response.data
}



const userService = {
    getUsers, 
    getUser, 
    followUser,
    unfollowUser, 
    findFollowers, 
    findFollowing, 
    getPostLikes, 
    getCommentLikes,
    searchUser,
}

export default userService