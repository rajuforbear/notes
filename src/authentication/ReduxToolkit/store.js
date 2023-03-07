import { configureStore } from "@reduxjs/toolkit";
import mySlice from './Slice'
import Slice from "../../ReduxTollkit/Slice";

const myStore=configureStore({
    reducer:{
        userData:mySlice,
        useData:Slice
    }
})
export default myStore