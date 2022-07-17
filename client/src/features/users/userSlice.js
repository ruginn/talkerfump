import { createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import userService from './userService'

const initialState = {
    users: [], 
    user: null, 
    isError: false, 
    isSuccess: false, 
    isLoading: false, 
    message: ''
}

// get users 
export const getUsers = createAsyncThunk('users/get', async(thunkAPI) => {
    try {
        return await userService.getUsers()
    } catch (error) {
        const message = error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})


// get user 
export const getUser = createAsyncThunk('users/getOne', async(id, thunkAPI) => {
    try {
        return userService.getUser(id)
    } catch(error) {
        const message = error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})


export const followUser = createAsyncThunk('user/follow', async (userId, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await userService.followUser(userId, token)
    } catch (error) {
        const message = error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})


export const unfollowUser = createAsyncThunk('user/unfollow', async (userId, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await userService.unfollowUser(userId, token)
    } catch (error) {
        const message = error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})


export const userSlice = createSlice({
    name: 'users', 
    initialState, 
    reducer: {
        reset: (state) => initialState
    }, 
    extraReducers: (builder) => {
        builder 
        .addCase(getUsers.pending, (state) => {
            state.isLoading = true
        })
        .addCase(getUsers.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.users = action.payload
        })
        .addCase(getUsers.rejected, (state, action) => {
            state.isError = true
            state.message = action.payload
        })
        .addCase(getUser.pending, (state) => {
            state.isLoading = true
        })
        .addCase(getUser.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.user = action.payload
        })
        .addCase(getUser.rejected, (state, action) => {
            state.isError = true
            state.message = action.payload
        })
        .addCase(followUser.pending, (state) => {
            state.isLoading = true
        })
        .addCase(followUser.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.user = action.payload
        })
        .addCase(followUser.rejected, (state, action) => {
            state.isError = true
            state.message = action.payload
        })
        .addCase(unfollowUser.pending, (state) => {
            state.isLoading = true
        })
        .addCase(unfollowUser.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.user = action.payload
        })
        .addCase(unfollowUser.rejected, (state, action) => {
            state.isError = true
            state.message = action.payload
        })

    }
})

export const {reset} = userSlice.actions;
export default userSlice.reducer
