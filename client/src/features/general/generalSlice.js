import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    topBar: true,
    modalPage: 1,
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
        },
        setModalPage1: (state) =>{
            state.modalPage = 1
        },
        setModalPage2: (state) =>{
            state.modalPage = 2
        },
        setModalPage3: (state) =>{
            state.modalPage = 3
        },
        setModalPage4: (state) =>{
            state.modalPage = 4
        }
    }
})

export const {setTopBarFalse, setTopBarTrue, setModalPage1, setModalPage2, setModalPage3, setModalPage4} =  generalSlice.actions;
export default generalSlice.reducer;