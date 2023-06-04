import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    topBar: true,
}

export const generalSlice = createSlice({
    name: 'general', 
    initialState,
    reducers: {
        setTopBarTrue: (state) => {
            state.topBar = true
        },
        setTopBarFalse: (state) =>{
            state.topBar = false
        }
    }
})

export const {setTopBarFalse, setTopBarTrue} =  generalSlice.actions;
export default generalSlice.reducer;