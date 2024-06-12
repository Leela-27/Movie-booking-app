import React, { memo, useCallback } from 'react';
import { Button, TextField, styled, Box } from '@mui/material';
import { setSelectedSeatTypes, setSeatNumbers } from '../Redux/reduxSlice';
import { useSelector, useDispatch } from 'react-redux';

// Define a styled input using MUI's styling
const Input = styled(TextField)(({ theme }) => ({
  '& .MuiInputBase-input': {
    backgroundColor: theme.palette.mode === 'light' ? '#F3F6F9' : '#1A2027',
    border: '1px solid',
    borderColor: theme.palette.mode === 'light' ? '#E0E3E7' : '#2D3843',
    fontSize: 12,
    padding: 3,
    width: '30px',
    height: '20px',
  },
}));

// Component for rendering a seat type button with an input field
const SeatTypeButton = memo(({
  seatType,
  isSelected,
  onClick,
  value,
  onChange,
}) => {
  console.log(seatType);
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
        flexDirection: 'column',
      }}
      variant="outlined"
      disableRipple={true}
      onClick={onClick}
    >
      {seatType}
      <Input
        type="number"
        value={value || 0}
        onChange={onChange}
        InputProps={{ inputProps: { min: 0, max: 12 } }}
      />
    </Button>
  );
}, (prevProps, nextProps) => prevProps.isSelected === nextProps.isSelected && prevProps.value === nextProps.value);

export const SeatButtonComponents = () => {
  const { selectedSeatTypes, seatNumbers } = useSelector((state) => state.booking);
  const dispatch = useDispatch();

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

  const seatTypes = ['A1', 'A2', 'A3', 'A4', 'D1', 'D2'];

  return (
    <div>
      <Box sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
        {seatTypes.map((seatType) => (
          <SeatTypeButton
            key={seatType}
            seatType={`Type ${seatType}`}
            isSelected={selectedSeatTypes.includes(seatType)}
            onClick={() => handleSelectSeatType(seatType)}
            value={seatNumbers[seatType] || 0}
            onChange={(event) => handleNumberChange(seatType, event)}
          />
        ))}
      </Box>
    </div>
  );
};
