import { configureStore } from '@reduxjs/toolkit'
import userReducer from '../state_slices/userSlice'

export const store = configureStore({
  reducer: {
    user: userReducer,
  },
})