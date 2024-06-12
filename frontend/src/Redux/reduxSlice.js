// src/redux/bookingSlice.js
import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  selectedMovie: '',
  selectedTimeSlot: '',
  selectedSeatTypes: [],
  seatNumbers: {},
  lastBooking: null,
  isLoading: false,  
  showMessage: false,
};

const bookingSlice = createSlice({
  name: 'booking',
  initialState,
  reducers: {
    setSelectedMovie: (state, action) => {
      state.selectedMovie = action.payload;
    },
    setSelectedTimeSlot: (state, action) => {
      state.selectedTimeSlot = action.payload;
    },
    setSelectedSeatTypes: (state, action) => {
      state.selectedSeatTypes = action.payload;
    },
    setSeatNumbers: (state, action) => {
      state.seatNumbers = action.payload;
    },
    setLastBooking: (state, action) => {
      state.lastBooking = action.payload;
    },
    setShowMessage: (state, action) => {
      state.showMessage = action.payload;
    },
    setIsLoading: (state, action) => { 
      state.isLoading = action.payload;
    },
    resetBookingState: (state) => {
      state.selectedMovie = '';
      state.selectedTimeSlot = '';
      state.selectedSeatTypes = [];
      state.seatNumbers = {};
    },
  },
});

export const {
  setSelectedMovie,
  setSelectedTimeSlot,
  setSelectedSeatTypes,
  setSeatNumbers,
  setLastBooking,
  setIsLoading,
  setShowMessage,
  resetBookingState,
} = bookingSlice.actions;

export const fetchLastBookingData = () => async (dispatch) => {
  const BASE_URL = process.env.REACT_APP_BASE_URL || 'https://movie-booking-app-1.onrender.com';
  // 
  try {
    dispatch(setIsLoading(true));  // Show loader
    const response = await axios.get(`${BASE_URL}/api/last`);
    dispatch(setLastBooking(response.data));
  } catch (error) {
    console.error('Error fetching last booking:', error);
  } finally {
    dispatch(setIsLoading(false));  // Hide loader
  }
};

export const bookNow = (bookingData) => async (dispatch) => {
  const BASE_URL = process.env.REACT_APP_BASE_URL || 'https://movie-booking-app-1.onrender.com';
  try {
    const response = await axios.post(`${BASE_URL}/api/bookings`, bookingData);
    dispatch(fetchLastBookingData());
    console.log('Backend response:', response.data);
    dispatch(resetBookingState());
    dispatch(setShowMessage(true));
    setTimeout(() => {
      dispatch(setShowMessage(false));
    }, 2000);
   
  } catch (error) {
    console.error(error);
  }
};

export default bookingSlice.reducer;
