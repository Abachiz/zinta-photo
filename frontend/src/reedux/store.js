import { configureStore } from '@reduxjs/toolkit'
import searchReducer from './searchslice'
import authReducer from './authslice'

export const store = configureStore({
    reducer:{
        text:searchReducer,
        user: authReducer
    }
})