import { configureStore } from '@reduxjs/toolkit'
import loginSlice from './LoginSlice'
import cartSlice from './CartSlice'

export const reduxToolkit = configureStore({
  reducer: {
    login : loginSlice,
    cart : cartSlice
  },
})