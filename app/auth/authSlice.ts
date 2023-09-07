import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoggedIn: false,
  isSeller: false,
  userInfo: null
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    userLogin(state, action) {
      state.isLoggedIn = true;
      state.isSeller = false;
      state.userInfo = action.payload;
    },
    sellerLogin(state, action) {
      state.isLoggedIn = true;
      state.isSeller = true;
      state.userInfo = action.payload;
    },
    logout(state) {
      state.isLoggedIn = false;
      state.isSeller = false;
      state.userInfo = null;
    }
  }
});

export const { userLogin, sellerLogin, logout } = authSlice.actions;
export default authSlice.reducer;
