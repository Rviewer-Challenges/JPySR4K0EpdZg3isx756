import { configureStore } from '@reduxjs/toolkit';
import developerReducer  from './developer/developerSlice'

export const store=configureStore({
    reducer:{
        developer: developerReducer,
    },
});