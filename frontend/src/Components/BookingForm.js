// src/components/BookingForm.js
import React, {useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Typography, Container, Box, Button } from '@mui/material';
import { LastBookingDetails } from './LastBookingDetails';
import { MovieButtonComponent } from '../buttons/MovieButton';
import { TimeSlotButtonsComponent } from '../buttons/TimeSlotButton';
import { SeatButtonComponents } from '../buttons/SeatButton';
import {   setShowMessage, bookNow } from '../Redux/reduxSlice';
import { motion } from "framer-motion";


export const BookingForm = () => {
  const dispatch = useDispatch();

  const {
    selectedMovie,
    selectedTimeSlot,
    selectedSeatTypes,
    seatNumbers,
    lastBooking,
    showMessage,
  } = useSelector((state) => state.booking);

  const handleShowMessage = useCallback(
    () => {
      dispatch(setShowMessage(true));
      setTimeout(() => {
        dispatch(setShowMessage(false));
      }, 2000);
    },
    [dispatch]
  );

  const handleBookNow = useCallback(
    (event) => {
      event.preventDefault();

      if (!selectedMovie || !selectedTimeSlot || selectedSeatTypes.length === 0) {
        alert("Please select all details before booking");
        return;
      }

      const allSeatTypes = ['A1', 'A2', 'A3', 'A4', 'D1', 'D2'];
      const reservations = allSeatTypes.map(seatType => ({
        seatType,
        number: seatNumbers[seatType] || 0
      }));

      const bookingData = {
        movie: selectedMovie,
        timeSlot: selectedTimeSlot,
        seatReservations: reservations,
      };

      dispatch(bookNow(bookingData))
        handleShowMessage()
    },
    [dispatch, selectedMovie, selectedTimeSlot, selectedSeatTypes, seatNumbers, handleShowMessage]
  );


  return (
    <div>
      <Container maxWidth="lg" sx={{ marginTop: '3rem', marginBottom: '1rem' }}>
        <Typography variant='h6'>Book that show!!</Typography>
        <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 10 }}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: ['column', 'column', 'row'],
              gap: 5,
              backgroundColor: 'white',
              padding: 1,
            }}
          >
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <Box sx={{ border: 2, width: 'full', padding: 1, display: 'flex', flexDirection: 'column' }}>
                <Box>
                  <Typography variant='h6'>Select A Movie</Typography>
                </Box>
                <MovieButtonComponent/>
              </Box>
              <Box sx={{ border: 2, width: 'full', padding: 1, display: 'flex', flexDirection: 'column' }}>
                <Box>
                  <Typography>Select A Time Slot</Typography>
                </Box>
               <TimeSlotButtonsComponent/>
              </Box>
              <Box sx={{ border: 2, width: 'auto', padding: 1, display: 'flex', flexDirection: 'column' }}>
                <Box>
                  <Typography>Select the Seats</Typography>
                </Box>
               <SeatButtonComponents/>
              </Box>
              <Button
                variant="contained"
                sx={{
                  width: '7rem',
                  textTransform: 'none',
                  backgroundImage: 'linear-gradient(to right, #00A6FF, #00E396)',
                  color: '#fff',
                  '&:hover': {
                    backgroundImage: 'linear-gradient(to right, #0072FF, #00C853)',
                  },
                }}
                onClick={(event) => handleBookNow(event)}
              >
                Book Now
              </Button>
            </Box>
            <LastBookingDetails lastBooking={lastBooking} />
          </Box>
        </div>
      </Container>
      {showMessage && (
        <motion.div
          initial={{ x: -300 }}
          animate={{ x: 0 }}
          exit={{ x: -300 }}
          transition={{ duration: 0.5 }}
          style={{
            padding: '5px',
            width: '10rem',
            border: '1px solid black',
            position: 'relative',
            left: 8,
            bottom: -90,
            backgroundColor: 'green',
          }}
        >
          <Typography sx={{ color: 'white' }}>Tickets Are Booked!!</Typography>
        </motion.div>
      )}
    </div>
  );
};
