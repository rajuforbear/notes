import {configureStore} from "@reduxjs/toolkit"
import dataReducer from './Slice'

const myStote=configureStore({
    reducer:{
        useData:dataReducer,
    }
})
export default myStote