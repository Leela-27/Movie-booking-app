import { useDispatch } from "react-redux";
import { BookingForm } from "./Components/BookingForm";
import { fetchLastBookingData } from "./Redux/reduxSlice";
import { useEffect } from "react";



function App() {
const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchLastBookingData())
  },[dispatch])
  return (
    <div>
      <BookingForm/>
    </div>
  );
}

export default App;
