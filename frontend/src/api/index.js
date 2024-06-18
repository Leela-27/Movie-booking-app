import axios from 'axios'

const url = 'https://movie-booking-app-wavz.onrender.com'
// const url = 'http://localhost:8080'

export const fetchLastBookingDetails = async () =>  await axios.get(`${url}/api/last`)

export const sendingBookingDetails = async (bookingData) => await axios.post(`${url}/api/bookings`, bookingData)