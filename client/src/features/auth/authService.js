import axios from 'axios'

// const API_URL = '/api/auth'
const API = axios.create({baseURL: 'http://localhost:8080/'})

// register user
const register = async (userData) => {
    const response = await API.post('/api/auth/register', userData) 
    if(response.data) {
        localStorage.setItem('auth', JSON.stringify(response.data))
        localStorage.setItem('user', JSON.stringify(response.data.user))
    }
    return response.data
}

// login user
const login = async (userData) => {
    const response = await API.post('/api/auth/login', userData)
    if(response.data) {
        localStorage.setItem('auth', JSON.stringify(response.data))
        localStorage.setItem('user', JSON.stringify(response.data.user))
    }
    return response.data
}


const authService = {
    register, 
    login, 
}

export default authService