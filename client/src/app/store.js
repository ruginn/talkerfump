import {configureStore} from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'
import postReducer from '../features/posts/postSlice'
import userReducer from '../features/users/userSlice'

export const store = configureStore({
    reducer: {
        auth: authReducer,
        post: postReducer,
        users: userReducer
    }
})