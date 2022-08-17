import { createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import notificationsService from './notificationsService'


const initialState = {
    notifications: [], 
    isError: false, 
    isSuccess: false, 
    isLoading: false, 
    count: 0, 
    message: ''
}

export const getNotifications = createAsyncThunk('notifications/get', async (_, thunkAPI) => {
    try {   
        const token = thunkAPI.getState().auth.user.token
        return await notificationsService.getNotifications(token)
    }catch (error) {
        const message = error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const setSeenNotifications = createAsyncThunk('notifications/seen', async(id, thunkAPI) =>{
    try {
        return await notificationsService.setSeenNotifications(id)
    } catch (error) {
        const message = error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})


export const notificationsSlice = createSlice({
    name: 'notifications', 
    initialState, 
    reducers: {
        reset: (state) => initialState, 
        checkNotifications: (state) => {
            state.count = 0
        }
    }, 
    extraReducers: (builder) => {
        builder
        .addCase(getNotifications.pending, (state) => {
            state.isLoading = true
        })
        .addCase(getNotifications.fulfilled, (state, action) => {
            let currentCount = 0
            action.payload.map((notification) => {
                if(!notification.read){
                    currentCount++
                }
            })
            state.isLoading = false
            state.isSuccess = true
            state.notifications = action.payload
            state.count = currentCount
        })
        .addCase(getNotifications.rejected, (state, action) => {
            state.isError = true
            state.message = action.payload
        })
        .addCase(setSeenNotifications.pending, (state) => {
            state.isLoading = true
        })
        .addCase(setSeenNotifications.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.message = action.payload
        })
        .addCase(setSeenNotifications.rejected, (state, action) => {
            state.isError = true
            state.message = action.payload
        })
    }
})

export const {reset, checkNotifications} = notificationsSlice.actions;
export default notificationsSlice.reducer