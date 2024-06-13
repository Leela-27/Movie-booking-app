import React, {  useMemo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Box, Typography } from '@mui/material';

export const LastBookingDetails = () => {

  // Get the last booking details and loading state from the Redux store
  const lastBooking = useSelector((state) => state.booking.lastBooking);
  const isLoading = useSelector((state) => state.booking.isLoading);

  // Memoize the rendering of the seat reservations list
  const renderSeatReservations = useMemo(() => {
    if (!lastBooking || !lastBooking.seatReservations) {
      return null;
    }

    return (
      <ul>
        {lastBooking.seatReservations.map((seat) => (
          <li key={seat.seatType}>
            {seat.seatType}: {seat.number}
          </li>
        ))}
      </ul>
    );
  }, [lastBooking]);

  // Memoize the function to handle rendering the booking details or a message
  const renderBookingDetails = useCallback(() => {
    if (isLoading) {
      return <Typography>Loading...</Typography>;
    }

    if (!lastBooking) {
      return <Typography>No Previous Booking Yet</Typography>;
    }

    return (
      <div>
        <Typography>Last Booking Details:</Typography>
        <Typography>Movie: {lastBooking.movie}</Typography>
        <Typography>Time Slot: {lastBooking.timeSlot}</Typography>
        <Typography>Seat Reservations:</Typography>
        {renderSeatReservations}
      </div>
    );
  }, [isLoading, lastBooking, renderSeatReservations]);

  return (
    <div>
      <Box sx={{ width: ['auto', 'auto', '12rem'], minHeight: '12rem', border: 2, padding: 3, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div>{renderBookingDetails()}</div>
      </Box>
    </div>
  );
};