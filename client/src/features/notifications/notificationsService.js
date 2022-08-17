import axios from "axios"

const API = axios.create({baseURL: 'http://localhost:8080/'})

const getNotifications = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        },
    }
    const response = await API.get('/api/notifications', config)
    return response.data
}

const setSeenNotifications = async (id) => {
    const response = await API.put(`/api/notifications/${id}/read`)
    return response.data
}

const notificationsService = {
    getNotifications, setSeenNotifications
}

export default notificationsService