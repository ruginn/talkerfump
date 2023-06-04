import {configureStore} from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'
import postReducer from '../features/posts/postSlice'
import userReducer from '../features/users/userSlice'
import chatReducer from '../features/chat/chatSlice'
import generalReducer from '../features/general/generalSlice'
import notificationReducer from '../features/notifications/notificationsSlice'

export const store = configureStore({
    reducer: {
        auth: authReducer,
        post: postReducer,
        users: userReducer,
        chats: chatReducer,
        notifications: notificationReducer,
        general: generalReducer, 
    }
})