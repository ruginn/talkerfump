import axios from 'axios'

// const API_URL = '/api/auth'
const API = axios.create({baseURL: 'https://kma75.onrender.com/'})

// register user
const register = async (userData) => {
    const response = await API.post('/api/auth/register', userData) 
    if(response.data) {
        localStorage.setItem('auth', JSON.stringify(response.data))
        localStorage.setItem('user', JSON.stringify(response.data))
    }
    return response.data
}

// login user
const login = async (userData) => {
    const response = await API.post('/api/auth/login', userData)
    if(response.data) {
        localStorage.setItem('auth', JSON.stringify(response.data))
        localStorage.setItem('user', JSON.stringify(response.data))
    }
    return response.data
}

//logout user
const logout = async (userData) => {
    localStorage.removeItem('auth')
    localStorage.removeItem('user')
}


// update user
const updateAuth = async (userInfo, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`, 
        }, 
    }
    const response = await API.put(`/api/auth/update`, userInfo, config)
    if(response.data) {
        localStorage.setItem('auth', JSON.stringify(response.data))
        localStorage.setItem('user', JSON.stringify(response.data))
    }
    return response.data
}

const getPartner = async(token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    const response = await API.put(`/api/users/findbuddy`, config, config)
    return response.data
}

const authService = {
    register, 
    login, 
    logout, 
    updateAuth,
    getPartner,
}

export default authService