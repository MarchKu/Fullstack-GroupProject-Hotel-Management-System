import axios from "axios";
import { useState} from "react";



export default function useBookingHistory() {
  const [bookingHistory, setBookingHistory] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);


  const getBookingHistoryByUsername = async (username) => {
    try {
      if (username) {
        setIsLoading(true);
        const result = await axios.get(`http://localhost:3000/api/booking/${username}`);
        setBookingHistory(result.data);
        setIsLoading(false);
        setIsError(false)
      }
    } catch (error) {
      console.error(error);
      setIsLoading(false)
      setIsError(true)
    }
  };
  const deleteBooking = async (bookingID) => {
    try {
      if (bookingID) {
        setIsLoading(true);
        const result = await axios.delete(`http://localhost:3000/api/booking/cancel/${bookingID}`);
        setIsLoading(false);
        setIsError(false)
      }
    } catch (error) {
      console.error(error);
      setIsLoading(false)
      setIsError(true)
    }
  };
  const getBookingByID = async(bookingID)=>{
    try {
      if (bookingID) {
        setIsLoading(true); 
        const result = await axios.get(`http://localhost:3000/api/booking/cancel/${bookingID}`);
        setBookingHistory(result.data);
        setIsLoading(false);
        setIsError(false)
      }
    } catch (error) {
      console.error(error);
      setIsLoading(false)
      setIsError(true)
    }
  }

  return {bookingHistory,getBookingHistoryByUsername,deleteBooking,getBookingByID,isLoading,isError}
}
