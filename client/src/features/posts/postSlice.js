import { createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import postService from './postService'

const initialState = {
    posts: [], 
    isError: false, 
    isSuccess: false, 
    isLoading: false, 
    message: '', 
    userPosts: ''
}


// create a post
export const createPost = createAsyncThunk('posts/create', async (postData, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await postService.createPost(postData, token)
    } catch (error) {
        const message = error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

// get users one post 
export const getPosts = createAsyncThunk('post/get', async(_, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await postService.getPosts(token)
    } catch (error){
        const message = error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

// get request for users posts
export const getUserPosts = createAsyncThunk('post/userPosts', async(userId, thunkAPI) => {
    try {
        return await postService.getUserPosts(userId)
    } catch (error) {
        const message = error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

// get timeline
export const getTimeline = createAsyncThunk('post/timeline', async(_, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await postService.getTimeline( token)
    } catch(error){
        const message = error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

// comment on a Post
export const commentOnPost = createAsyncThunk('put/comment', async(commentData, thunkAPI) => {
    try{
        const token = thunkAPI.getState().auth.user.token
        return await postService.commentOnPost(commentData, token)
    } catch(error){
        const message = error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const deleteComment = createAsyncThunk('delete/comment', async(commentData, thunkAPI) => {
    try{
        const token = thunkAPI.getState().auth.user.token
        return await postService.deleteComment(commentData, token)
    } catch(error){
        const message = error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})


export const likeComment = createAsyncThunk('like/comment', async(commentData, thunkAPI) => {
    try{
        const token = thunkAPI.getState().auth.user.token
        return await postService.likeComment(commentData, token)
    } catch(error){
        const message = error.toString()
        return thunkAPI.rejectWithValue(message)
    }
}) 

// delete post
export const deletePost = createAsyncThunk('delete/post', async(postId, thunkAPI) => {
    try{
        const token = thunkAPI.getState().auth.user.token
        return await postService.deletePost(postId, token)
    } catch(error){
        const message = error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

// like post
export const likePost = createAsyncThunk('like/post', async(postId, thunkAPI) => {
    try{
        const token = thunkAPI.getState().auth.user.token
        return await postService.likePost(postId, token)
    }catch(error){
        const message = error.toStrin()
        return thunkAPI.rejectWithValue(message)
    }
})

export const postSlice = createSlice({
    name: 'post', 
    initialState, 
    reducers: {
        reset: (state) => initialState,
    }, 
    extraReducers: (builder) => {
        builder
            .addCase(createPost.pending, (state) => {
                state.isLoading = true
            })
            .addCase(createPost.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                const posts = state.posts
                state.posts = [action.payload, ...posts]
            })
            .addCase(createPost.rejected, (state, action) => {
                state.isLoading = true
                state.isError = true
                state.message = action.payload
            })
            .addCase(getPosts.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getPosts.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.posts = action.payload
            })
            .addCase(getPosts.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(getUserPosts.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getUserPosts.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.posts = action.payload
            })
            .addCase(getUserPosts.rejected, (state, action) => {
                state.isLoading = true
                state.isError = true
                state.message = action.payload
            })
            .addCase(getTimeline.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getTimeline.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.posts = action.payload   
            })
            .addCase(getTimeline.rejected, (state, action) => {
                state.isLoading = true
                state.isError = true
                state.message = action.payload
            })
            .addCase(commentOnPost.pending, (state) => {
                state.isLoading = true
            })
            .addCase(commentOnPost.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                const { _id } = action.payload;
                action.payload.date = new Date().toISOString();
                const newData = state.posts.map((post) => {
                    if (post._id === _id) {
                        return action.payload
                    } else {
                        return post
                    }
                })
                // const posts = state.posts.filter(post => post._id !== _id);
                // state.posts = [action.payload, ...posts]
                state.posts =  newData
            })
            .addCase(commentOnPost.rejected, (state, action) => {
                state.isLoading = true
                state.isError = true
                state.message = action.payload
            })
            .addCase(deleteComment.pending, (state) => {
                state.isLoading = true
            })
            .addCase(deleteComment.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                const { _id } = action.payload;
                action.payload.date = new Date().toISOString();
                const newData = state.posts.map((post) => {
                    if (post._id === _id) {
                        return action.payload
                    } else {
                        return post
                    }
                })
                // const posts = state.posts.filter(post => post._id !== _id);
                // state.posts = [action.payload, ...posts]
                state.posts =  newData
            })
            .addCase(deleteComment.rejected, (state, action) => {
                state.isLoading = true
                state.isError = true
                state.message = action.payload
            })
            .addCase(likeComment.pending, (state) => {
                state.isLoading = true
            })
            .addCase(likeComment.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                const { _id } = action.payload;
                action.payload.date = new Date().toISOString();
                const newData = state.posts.map((post) => {
                    if (post._id === _id) {
                        return action.payload
                    } else {
                        return post
                    }
                })
                // const posts = state.posts.filter(post => post._id !== _id);
                // state.posts = [action.payload, ...posts]
                state.posts =  newData
            })
            .addCase(likeComment.rejected, (state, action) => {
                state.isLoading = true
                state.isError = true
                state.message = action.payload
            })
            .addCase(deletePost.pending, (state) => {
                state.isLoading = true
            })
            .addCase(deletePost.fulfilled, (state, action) => {
                const  _id  = action.payload;
                state.isLoading = false
                state.isSuccess = true
                const posts = state.posts.filter(post => post._id !== _id);
                state.posts = [ ...posts]
            })
            .addCase(deletePost.rejected, (state, action) => {
                state.isLoading = true
                state.isError = true
                state.message = action.payload
            })
            .addCase(likePost.pending, (state) => {
                state.isLoading = true
            })
            .addCase(likePost.fulfilled, (state, action) => {
                const { _id } = action.payload;
                action.payload.date = new Date().toISOString();
                const newData = state.posts.map(post=> 
                    {if(post._id === _id){
                        return action.payload
                    } else {
                        return post
                    }})
                // const posts = state.posts.filter(post => post._id !== _id);
                state.posts = newData
                state.isLoading = false
                state.isSuccess = true
                
            })
            .addCase(likePost.rejected, (state, action) => {
                state.isLoading = true
                state.isError = true
                state.message = action.payload
            })
    }
})

export const {reset} = postSlice.actions
export default postSlice.reducer 

// return {
//     ...state,
//     posts: EditData(state.posts, action.payload._id, action.payload)
// };

// export const EditData = (data, id, post) => {
//     const newData = data.map(item => 
//         (item._id === id ? post : item)
//     )
//     return newData;
// }