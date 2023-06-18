import axios from 'axios'

// const API_URL = '/api/auth'
const API = axios.create({baseURL: 'https://kma75.onrender.com/'})


const createPost = async (postData, token) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`, 
        }, 
    }

    const response = await API.post('/api/post', postData, config)
    return response.data
}


const getPosts = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`, 
        }, 
    }
    const response = await API.get(`/api/post/myposts`, config)
    return response.data
}

const getUserPosts = async (userId) => {
    const response =  await API.get(`/api/users/${userId}/posts`)
    return response.data
}


const getTimeline = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`, 
        }, 
    }

    const response = await API.get(`/api/post/timeline`, config)
    return response.data
}


const commentOnPost = async (commentData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`, 
        }, 
    }
    const {postId} = commentData
    const response =  await API.put(`/api/post/${postId}/comment`, commentData, config)
    return response.data
}

const deleteComment = async (commentData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`, 
        }, 
    }
    const {commentId, postId} = commentData
    const response = await API.put(`/api/post/${postId}/comment/delete`, commentData, config)
    return response.data
}

const likeComment = async (commentData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`, 
        }, 
    }
    const {commentId, postId} = commentData
    const response = await API.put(`/api/post/${postId}/comment/like`, commentData, config)
    return response.data
}


const deletePost = async (postId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`, 
        }, 
    }
    const response = await API.delete(`/api/post/${postId}`, config, config)
    return postId
}


const likePost = async (postId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`, 
        }, 
    }
    const response = await API.put(`/api/post/${postId}/like`, config, config)
    return response.data
}

const postService = {
    createPost,
    getPosts, 
    getUserPosts, 
    getTimeline, 
    commentOnPost, 
    deletePost,
    likePost, 
    deleteComment, 
    likeComment,
}

export default postService