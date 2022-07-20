import axios from 'axios'

// const API_URL = '/api/auth'
const API = axios.create({baseURL: 'http://localhost:8080/'})


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
    console.log(userId)
    const response = await API.get(`/api/users/${userId}/findfollowers`)
    return response.data
}

const findFollowing = async(userId) => {
    console.log(userId)
    const response = await API.get(`/api/users/${userId}/findfollowing`)
    return response.data
}


const userService = {
    getUsers, 
    getUser, 
    followUser,
    unfollowUser, 
    findFollowers, 
    findFollowing, 
}

export default userService