import axios from 'axios'


const API = axios.create({baseURL: 'http://localhost:8080/'})


const createChat = async(chatData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }, 
    }
    const response = await API.post(`/api/chat`, chatData, config)
    console.log(response.data)
    return response.data
}

const getUserChats = async(token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }, 
    }
    const response = await API.get(`/api/chat`, config, config)
    return response.data
}


const createActiveChat = async(chatId) => {
    const response = await API.get(`/api/chat/${chatId}`)
    return response.data
}


const createMessage = async(chatData, token) => {
    const {chatId} = chatData
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }, 
    }
    const response = await API.post(`/api/chat/${chatId}/message`, chatData, config)
    return response.data
}

const getChatMessages = async(chatData, token) => {
    const {chatId} = chatData
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }, 
    }
    const response = await API.get(`/api/chat/${chatId}/getmessages`, config, config)
    return response.data
}

const setMessageSeen = async(messageId) => {
    const response = await API.put(`/api/chat/${messageId}/setseen`, messageId)
    return response
}

const chatService = {
    createChat,
    getUserChats,
    createActiveChat,
    createMessage,
    getChatMessages, 
    setMessageSeen,
}

export default chatService; 