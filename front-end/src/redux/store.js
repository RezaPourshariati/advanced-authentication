import { configureStore } from '@reduxjs/toolkit'
import authReducer from './features/auth/authSlice'
import filterReducer from './features/auth/filterSlice'
import emailReducer from './features/email/emailSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    email: emailReducer,
    filter: filterReducer,
  },
})

// console.log(store.getState()); // returns the current state values ()
