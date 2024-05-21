import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box, Typography } from '@mui/material';
import { fetchLastBookingData } from '../Redux/reduxSlice';  // Adjust the path as necessary

export const LastBookingDetails = () => {
  const dispatch = useDispatch();

  // Fetch the last booking details when the component mounts
  useEffect(() => {
    dispatch(fetchLastBookingData());
  }, [dispatch]);

  // Get the last booking details and loading state from the Redux store
  const lastBooking = useSelector((state) => state.booking.lastBooking);
  const isLoading = useSelector((state) => state.booking.isLoading);

  return (
    <div>
      <Box sx={{ width: ['auto', 'auto', '12rem'], minHeight: '12rem', border: 2, padding: 3, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div>
          {isLoading ? (
            // Display a loader when data is being fetched
            <Typography>Loading...</Typography>
          ) : (
            // Display the booking details or a message when there is no previous booking
            lastBooking ? (
              <div>
                <Typography>Last Booking Details:</Typography>
                <Typography>Movie: {lastBooking.movie}</Typography>
                <Typography>Time Slot: {lastBooking.timeSlot}</Typography>
                {/* Display seat reservations */}
                <Typography>Seat Reservations:</Typography>
                <ul>
                  {/* Map through the seat reservations and display them */}
                  {lastBooking.seatReservations?.map((seat) => (
                    <li key={seat.seatType}>
                      {seat.seatType}: {seat.number}
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <Typography>No Previous Booking Yet</Typography>
            )
          )}
        </div>
      </Box>
    </div>
  );
};
