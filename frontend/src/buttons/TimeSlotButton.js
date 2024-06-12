import React, { memo, useCallback } from "react";
import { Button, Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedTimeSlot } from '../Redux/reduxSlice';

const TimeSlotButton = memo(({ timeSlot, isSelected, onClick }) => {
  console.log('time is got rendered ',timeSlot);
  return (
    <Button
      sx={{
        // Define button styles based on selection state
        color: isSelected ? '#33eaff' : '#303030',
        borderColor: isSelected ? '#33eaff' : '#303030',
        boxShadow: isSelected ? '0px 0px 10px #33eaff' : '#303030',
        textTransform: 'none',
        padding: '4px',
        width: 'auto',
        margin: '4px',
        fontSize: '1rem',
        display: 'flex',
        flexDirection: 'column'
      }}
      variant="outlined"
      onClick={onClick}
    >
      {timeSlot}
    </Button>
  );
}, (prevProps, nextProps) => prevProps.isSelected === nextProps.isSelected);

export const TimeSlotButtonsComponent = () => {
  const { selectedTimeSlot } = useSelector((state) => state.booking);
  const dispatch = useDispatch();

  const handleSelectTimeSlot = useCallback(
    (timeSlot) => {
      dispatch(setSelectedTimeSlot(timeSlot));
    },
    [dispatch]
  );

  // Array of time slots
  const timeSlots = ['10:00 PM', '01:00 PM', '03:00 PM', '08:00 PM'];

  return (
    <div>
      <Box sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
        {timeSlots.map((timeSlot) => (
          <TimeSlotButton
            key={timeSlot}
            timeSlot={timeSlot}
            isSelected={selectedTimeSlot === timeSlot}
            onClick={() => handleSelectTimeSlot(timeSlot)}
          />
        ))}
      </Box>
    </div>
  );
};
