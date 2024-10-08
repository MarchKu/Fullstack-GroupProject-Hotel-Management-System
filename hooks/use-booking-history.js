import axios from "axios";
import { useState } from "react";

export default function useBookingHistory() {
  const [bookingHistory, setBookingHistory] = useState(null);
  const [totalPage, setTotalPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const getBookingHistoryByUsername = async (username, page) => {
    try {
      if (username) {
        setIsLoading(true);
        const result = await axios.get(
          `https://neatly-hotel.vercel.app/api/booking/history/${username}?page=${page}`
        );
        setBookingHistory(result.data[0]);
        setTotalPage(result.data[1]);
        setIsLoading(false);
        setIsError(false);
      }
    } catch (error) {
      console.error(error);
      setIsLoading(false);
      setIsError(true);
    }
  };
  const cancelBooking = async (bookingID) => {
    try {
      if (bookingID) {
        setIsLoading(true);
        const result = await axios.put(
          `https://neatly-hotel.vercel.app/api/booking/cancel/${bookingID}`
        );
        setIsLoading(false);
        setIsError(false);
      }
    } catch (error) {
      console.error(error);
      setIsLoading(false);
      setIsError(true);
    }
  };
  const getBookingByID = async (bookingID) => {
    try {
      if (bookingID) {
        setIsLoading(true);
        const result = await axios.get(
          `https://neatly-hotel.vercel.app/api/booking/cancel/${bookingID}`
        );
        setBookingHistory(result.data);
        setIsLoading(false);
        setIsError(false);
      }
    } catch (error) {
      console.error(error);
      setIsLoading(false);
      setIsError(true);
    }
  };

  return {
    bookingHistory,
    totalPage,
    getBookingHistoryByUsername,
    cancelBooking,
    getBookingByID,
    isLoading,
    isError,
  };
}
