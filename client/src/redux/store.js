
import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slices/authSlice.js'
import jobReducer from './slices/jobSlice.js'
import themeReducer from './slices/themeSlice.js'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    jobs: jobReducer,
    theme: themeReducer,
  },
})
