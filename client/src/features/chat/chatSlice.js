import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import chatService from './chatService'

const initialState = {
    chats: [],
    activeChat: '',
    activeMessages: [], 
    isError: false,
    isSuccess: false,
    isLoading: false, 
    message: ''
}

//Create chat with user
export const createChat =  createAsyncThunk('create/chat', async(chatData, thunkAPI) => {
    try{
        const token = thunkAPI.getState().auth.user.token
        return await chatService.createChat(chatData, token)
    } catch (error) {
        const message = error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const chatSlice = createSlice({
    name: 'chats',
    initialState,
    reducers: {
        reset: (state) => initialState
    },
    extraReducers: (builder) => {
        builder
        .addCase(createChat.pending,  (state) =>{
            state.isLoading = true
        })
        .addCase(createChat.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.chats.push(action.payload)
            state.activeChat = action.payload
        })
        .addCase(createChat.rejected, (state, action) => {
            state.isError = true
            state.message = action.payload
        })
    }
})


export const {reset} = chatSlice.actions; 
export default chatSlice.reducer;
