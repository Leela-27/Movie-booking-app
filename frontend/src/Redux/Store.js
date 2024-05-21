// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import bookingReducer from './reduxSlice';

export const store = configureStore({
  reducer: {
    booking: bookingReducer,
  },
});
