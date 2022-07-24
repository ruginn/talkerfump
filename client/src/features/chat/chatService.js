import axios from 'axios'

const API = axios.create({baseURL: 'http://localhost:8080/'})


const createChat = async(chatData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }, 
    }
    console.log(chatData)
    const response = await API.post(`/api/chat`, chatData, config)
    console.log(response.data)
    return response.data
}


const chatService = {
    createChat,
}

export default chatService; 