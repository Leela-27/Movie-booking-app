// src/components/BookingForm.js
import React, {useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Typography, Container, Box, Button } from '@mui/material';
import { LastBookingDetails } from './LastBookingDetails';
import { 
  setSelectedMovie, 
  setSelectedTimeSlot, 
  setSelectedSeatTypes, 
  setSeatNumbers, 
  setShowMessage, 
  fetchLastBookingData, 
  bookNow 
} from '../Redux/reduxSlice';
import { MovieButton, TimeSlotButton, SeatTypeButton } from '../buttons/Buttons';
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


  const handleSelectMovie = useCallback(
    (movie) => {
      dispatch(setSelectedMovie(movie));
    },
    [dispatch]
  );

  const handleSelectTimeSlot = useCallback(
    (timeSlot) => {
      dispatch(setSelectedTimeSlot(timeSlot));
    },
    [dispatch]
  );

  const handleSelectSeatType = useCallback(
    (seatType) => {
      const updatedSeatTypes = [...selectedSeatTypes];
      if (!updatedSeatTypes.includes(seatType)) {
        updatedSeatTypes.push(seatType);
      }
      dispatch(setSelectedSeatTypes(updatedSeatTypes));
    },
    [dispatch, selectedSeatTypes]
  );

  const handleNumberChange = useCallback(
    (seatType, event) => {
      const updatedNumbers = { ...seatNumbers, [seatType]: parseInt(event.target.value) };
      dispatch(setSeatNumbers(updatedNumbers));
    },
    [dispatch, seatNumbers]
  );

  
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
      .then(() => {
        handleShowMessage()
        dispatch(fetchLastBookingData())
      });
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
                <Box sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
                  <MovieButton
                    movieName='suraj par mangal bhari'
                    isSelected={selectedMovie === 'suraj par mangal bhari'}
                    onClick={() => handleSelectMovie('suraj par mangal bhari')}
                  />
                  <MovieButton
                    movieName='Tenet'
                    isSelected={selectedMovie === 'Tenet'}
                    onClick={() => handleSelectMovie('Tenet')}
                  />
                  <MovieButton
                    movieName='The war with grandpa'
                    isSelected={selectedMovie === 'The war with grandpa'}
                    onClick={() => handleSelectMovie('The war with grandpa')}
                  />
                  <MovieButton
                    movieName="The personal history of David Copperfield"
                    isSelected={selectedMovie === 'The personal history of David Copperfield'}
                    onClick={() => handleSelectMovie('The personal history of David Copperfield')}
                  />
                  <MovieButton
                    movieName="Come Play"
                    isSelected={selectedMovie === 'Come Play'}
                    onClick={() => handleSelectMovie('Come Play')}
                  />
                </Box>
              </Box>
              <Box sx={{ border: 2, width: 'full', padding: 1, display: 'flex', flexDirection: 'column' }}>
                <Box>
                  <Typography>Select A Time Slot</Typography>
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
                  <TimeSlotButton
                    timeSlot='10:00 PM'
                    isSelected={selectedTimeSlot === '10:00 PM'}
                    onClick={() => handleSelectTimeSlot('10:00 PM')}
                  />
                  <TimeSlotButton
                    timeSlot='01:00 PM'
                    isSelected={selectedTimeSlot === '01:00 PM'}
                    onClick={() => handleSelectTimeSlot('01:00 PM')}
                  />
                  <TimeSlotButton
                    timeSlot='03:00 PM'
                    isSelected={selectedTimeSlot === '03:00 PM'}
                    onClick={() => handleSelectTimeSlot('03:00 PM')}
                  />
                  <TimeSlotButton
                    timeSlot='08:00 PM'
                    isSelected={selectedTimeSlot === '08:00 PM'}
                    onClick={() => handleSelectTimeSlot('08:00 PM')}
                  />
                </Box>
              </Box>
              <Box sx={{ border: 2, width: 'auto', padding: 1, display: 'flex', flexDirection: 'column' }}>
                <Box>
                  <Typography>Select the Seats</Typography>
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
                  <SeatTypeButton
                    seatType='Type A1'
                    isSelected={selectedSeatTypes.includes('A1')}
                    onClick={() => handleSelectSeatType('A1')}
                    value={seatNumbers['A1'] || 0}
                    onChange={(event) => handleNumberChange('A1', event)}
                  />
                  <SeatTypeButton
                    seatType='Type A2'
                    isSelected={selectedSeatTypes.includes('A2')}
                    onClick={() => handleSelectSeatType('A2')}
                    value={seatNumbers['A2'] || 0}
                    onChange={(event) => handleNumberChange('A2', event)}
                  />
                  <SeatTypeButton
                    seatType='Type A3'
                    isSelected={selectedSeatTypes.includes('A3')}
                    onClick={() => handleSelectSeatType('A3')}
                    value={seatNumbers['A3'] || 0}
                    onChange={(event) => handleNumberChange('A3', event)}
                  />
                  <SeatTypeButton
                    seatType='Type A4'
                    isSelected={selectedSeatTypes.includes('A4')}
                    onClick={() => handleSelectSeatType('A4')}
                    value={seatNumbers['A4'] || 0}
                    onChange={(event) => handleNumberChange('A4', event)}
                  />
                  <SeatTypeButton
                    seatType='Type D1'
                    isSelected={selectedSeatTypes.includes('D1')}
                    onClick={() => handleSelectSeatType('D1')}
                    value={seatNumbers['D1'] || 0}
                    onChange={(event) => handleNumberChange('D1', event)}
                  />
                  <SeatTypeButton
                    seatType='Type D2'
                    isSelected={selectedSeatTypes.includes('D2')}
                    onClick={() => handleSelectSeatType('D2')}
                    value={seatNumbers['D2'] || 0}
                    onChange={(event) => handleNumberChange('D2', event)}
                  />
                </Box>
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
