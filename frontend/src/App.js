import { useDispatch } from "react-redux";
import { BookingForm } from "./Components/BookingForm";
import { getLastBookingDetails } from "./Redux/reduxSlice";
import { useEffect } from "react";



function App() {
const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getLastBookingDetails())
  },[dispatch])
  return (
    <div>
      <BookingForm/>
    </div>
  );
}

export default App;
