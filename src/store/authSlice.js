// src/features/authSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: JSON.parse(localStorage.getItem('userData')) || null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    signInStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    signInSuccess: (state, action) => {
      state.user = action.payload;
      state.loading = false;
      state.error = null;
      localStorage.setItem('userData', JSON.stringify(action.payload)); // Save user data to localStorage
    },
    signInFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    signOut: (state) => {
      state.user = null;
      localStorage.removeItem('userData'); // Remove user data from localStorage on sign out
    },
  },
});

export const { signInStart, signInSuccess, signInFailure, signOut } = authSlice.actions;
export default authSlice.reducer;
