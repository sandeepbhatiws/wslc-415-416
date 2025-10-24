import { createSlice } from '@reduxjs/toolkit'
import Cookies from 'js-cookie';

Cookies.set('isLogin', 1);

const initialState = {
  isLogin: 0,
}

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    increment: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value += 1
    },
    decrement: (state) => {
      state.value -= 1
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const {  } = loginSlice.actions

export default loginSlice.reducer