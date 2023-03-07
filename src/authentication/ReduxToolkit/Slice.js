import { createSlice } from "@reduxjs/toolkit";
 let initialState=null
const MySlicer=createSlice({
    name:'Data',
    initialState,
    reducers:{
        addData(state,action){
            state=action.payload
            return state
        }
    }
})
export const {addData}=MySlicer.actions
export default MySlicer.reducer