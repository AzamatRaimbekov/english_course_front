import { configureStore } from '@reduxjs/toolkit'
import { levelReducer } from './slices/levels'
import { authReducer } from './slices/auth'
import { madalSlice } from './slices/modalWindow'

export const store = configureStore({
  reducer: {
    levels: levelReducer,
    auth: authReducer,
    madalSlice: madalSlice
  },
})