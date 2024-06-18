import axios from 'axios'

const url = 'https://movie-booking-app-wavz.onrender.com'
// const url = 'http://localhost:8080'

export const fetchLastBookingDetails = () => axios.get(`${url}/api/last`)

export const sendingBookingDetails = (bookingData) => axios.post(`${url}/api/bookings`, bookingData)