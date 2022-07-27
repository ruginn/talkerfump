import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import chatService from './chatService'

const initialState = {
    chats: [],
    activeChat: '',
    activeMessages: [], 
    isError: false,
    isSuccess: false,
    isLoading: false, 
    message:'',
    chatMessages: '', 
    otherUser: '',
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

// Get user chats
export const getUserChats = createAsyncThunk('get/chats', async(_, thunkAPI) => {
    try{
        const token = thunkAPI.getState().auth.user.token
        return await chatService.getUserChats(token)
    } catch(error) {
        const message = error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})


export const createActiveChat = createAsyncThunk('active/chat', async(chatId, thunkAPI) => {
    try{
        return await chatService.createActiveChat(chatId)
    } catch(error) {
        const message = error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const createMessage = createAsyncThunk('message/chat', async(chatData, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await chatService.createMessage(chatData, token)
    } catch (error) {
        const message = error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})


export const getChatMessages = createAsyncThunk('getMessages/chat', async(chatData, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await chatService.getChatMessages(chatData, token)
    } catch (error) {
        const message = error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const chatSlice = createSlice({
    name: 'chats',
    initialState,
    reducers: {
        reset: (state) => initialState, 
        setActiveChat: (state, action) => {
            state.activeChat = action.payload
            },
        addChatMessage: (state, action) => {
            state.chatMessages.push(action.payload)
        }, 
        addOtherUser: (state, action) => {
            state.otherUser = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(createChat.pending,  (state) =>{
            state.isLoading = true
        })
        .addCase(createChat.fulfilled, (state, action) => {
            if(action.payload[0]){
                const id = action.payload[0]._id 
                const filteredChats = state.chats.filter(chat => chat._id !== id)
                state.chats = [action.payload[0], ...filteredChats]
                state.activeChat = action.payload[0]
            } else{
                state.activeChat = action.payload
            }
            // console.log(action.payload[0])
            // const id = action.payload[0]._id
            state.isLoading = false
            state.isSuccess = true
            // const filteredChats = state.chats.filter(chat => chat._id !== id)
            // state.chats = [action.payload[0], ...filteredChats]
            // state.activeChat = action.payload
        })
        .addCase(createChat.rejected, (state, action) => {
            state.isError = true
            state.message = action.payload
        })
        .addCase(getUserChats.pending,  (state) =>{
            state.isLoading = true
        })
        .addCase(getUserChats.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.chats = action.payload
        })
        .addCase(getUserChats.rejected, (state, action) => {
            state.isError = true
            state.message = action.payload
        })
        .addCase(createActiveChat.pending,  (state) =>{
            state.isLoading = true
        })
        .addCase(createActiveChat.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.activeChat = action.payload
        })
        .addCase(createActiveChat.rejected, (state, action) => {
            state.isError = true
            state.message = action.payload
        })
        .addCase(createMessage.pending,  (state) =>{
            state.isLoading = true
        })
        .addCase(createMessage.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
        })
        .addCase(createMessage.rejected, (state, action) => {
            state.isError = true
            state.message = action.payload
        })
        .addCase(getChatMessages.pending,  (state) =>{
            state.isLoading = true
        })
        .addCase(getChatMessages.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.chatMessages = action.payload;
        })
        .addCase(getChatMessages.rejected, (state, action) => {
            state.isError = true
            state.message = action.payload
        })
    }
})


export const {reset, setActiveChat, addChatMessage, addOtherUser} = chatSlice.actions; 
export default chatSlice.reducer;
