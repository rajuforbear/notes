import { configureStore } from "@reduxjs/toolkit";
import mySlice from './Slice'

const myStore=configureStore({
    reducer:{
        userData:mySlice
    }
})
export default myStore