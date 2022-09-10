import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import authService from './authService'

const user = JSON.parse(localStorage.getItem('auth'));

const initialState = {
    user: user ? user: null, 
    isError: false, 
    isSuccess: false, 
    isLoading: false, 
    message: '',
}

export const register = createAsyncThunk('auth/register', async(user, thunkAPI) => {
    try {
        return await authService.register(user)
    } catch (error) {
        const message = error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const login = createAsyncThunk('auth/login', async (user, thunkAPI) => {
    try {
        return await authService.login(user)
    } catch (error) {
        const message = error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const logout = createAsyncThunk('auth/logout', async () => {
    await authService.logout()
})


// update auth on follow and unfollow
export const updateAuth = createAsyncThunk('auth/update', async(userInfo, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await authService.updateAuth(userInfo, token)
    } catch (error) {
        const message = error.toString()
        return thunkAPI.rejectWithValue(message)
    }
}) 

export const getPartner = createAsyncThunk('get/partner', async(_, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await authService.getPartner(token)
    } catch(error){
        const message = error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const authSlice = createSlice({
    name: 'auth', 
    initialState, 
    reducers: {
        reset: (state) => {
            state.isLoading = false
            state.isSuccess = false
            state.isError = false 
            state.message = ''
        }, 
        following: (state, action) => {
            state.user.following.push(action.payload)
            localStorage.setItem('auth', JSON.stringify(state.user))
        }, 
        unfollowing: (state, action) => {
            const newList = state.user.following.filter(id => id !== action.payload)
            state.user.following = newList
            localStorage.setItem('auth', JSON.stringify(state.user))
        }, 
        updateProfilePic : (state, action) => {
            state.user.profileImage = action.payload
            localStorage.setItem('auth', JSON.stringify(state.user))
        },
        streak: (state, action) => {
            state.user.day.date = action.payload.date
            state.user.day.streak = action.payload.streak
        }, 

    }, 
    extraReducers: (builder) => {
        builder
            .addCase(register.pending, (state) => {
                state.isLoading = true
            })
            .addCase(register.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.user = action.payload
            })
            .addCase(register.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
                state.user = null
            })
            .addCase(login.pending, (state) => {
                state.isLoading = true
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.user = action.payload
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
                state.user = null
            })
            .addCase(logout.fulfilled, (state) => {
                state.user = null
              })
            .addCase(updateAuth.pending, (state) => {
                state.isLoading = true
            })
            .addCase(updateAuth.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.user = action.payload
            })
            .addCase(updateAuth.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
                state.user = null
            })
            .addCase(getPartner.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getPartner.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.user.buddy = action.payload
                localStorage.setItem('auth', JSON.stringify(state.user))
            })
            .addCase(getPartner.rejected, (state, action) => {
                state.isError = true
                state.user.buddy = action.payload
            })
    }
})

export const {reset, following, unfollowing, updateProfilePic, streak} = authSlice.actions
export default authSlice.reducer