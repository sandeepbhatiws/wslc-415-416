import { createSlice } from '@reduxjs/toolkit'
import Cookies from 'js-cookie';

var isLogin = Cookies.get('token');
var isLogin = isLogin ? true : false; 

const initialState = {
  value: isLogin,
}

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    login: (state) => {
      state.value = 1
    },
    register: (state) => {
      state.value = 1
    },
    logout: (state, action) => {
        Cookies.remove('token')
        state.value = 0;
    },
  },
})

// Action creators are generated for each case reducer function
export const { login, register, logout } = loginSlice.actions

export default loginSlice.reducer