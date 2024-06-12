import React, { memo, useCallback} from 'react';
import { Button, Box } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedMovie } from '../Redux/reduxSlice';

const MovieButton = memo(
  ({ movieName, isSelected, onClick }) => {
    console.log('rendered this movie name',movieName);

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
        onClick={onClick}
    
      >
        {movieName}
      </Button>
    );
  },
  (prevProps, nextProps) => prevProps.isSelected === nextProps.isSelected
);

export const MovieButtonComponent = () => {
  const dispatch = useDispatch();
  const {selectedMovie} = useSelector((state) => state.booking)
 
  const handleSelectMovie = useCallback(
    (movie) => {
      console.log('moviebuttoncomponent', movie);
      dispatch(setSelectedMovie(movie));
    },
    [dispatch]
  );

  const movieList = [
    'suraj par mangal bhari',
    'Tenet',
    'The war with grandpa',
    'The personal history of David Copperfield',
    'Come Play',
  ];

  return (
    <div>
      <Box sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
        {movieList.map((movie) => (
          <MovieButton
            key={movie}
            movieName={movie}
            isSelected={movie === selectedMovie}
            onClick={() => handleSelectMovie(movie)}
          />
        ))}
      </Box>
    </div>
  );
};
