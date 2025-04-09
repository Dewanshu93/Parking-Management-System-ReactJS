import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice.js'; // Auth slice

const store = configureStore({
  reducer: {
    auth: authReducer, // Add authentication slice reducer
  },
});

export default store;
