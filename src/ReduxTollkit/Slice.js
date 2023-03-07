import { createSlice } from "@reduxjs/toolkit";

const initialState={};
const dataSlie=createSlice({
      name:'userData',
      initialState,
      reducers:{
         
        dataToupdate(state,action){
            state =action.payload
            return state
        }
          
      }
})
export const {dataToupdate}=dataSlie.actions
export default dataSlie.reducer