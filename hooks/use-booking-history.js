import axios from "axios";
import { useState } from "react";

export default function useBookingHistory() {
  const [bookingHistory, setBookingHistory] = useState(null);
  const [totalPage, setTotalPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const API_BASE_URL = "http://localhost:3000" || "${API_BASE_URL}";

  const getBookingHistoryByUsername = async (username, page) => {
    try {
      if (username) {
        setIsLoading(true);
        const result = await axios.get(
          `${API_BASE_URL}/api/booking/history/${username}?page=${page}`
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
          `${API_BASE_URL}/api/booking/cancel/${bookingID}`
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
          `${API_BASE_URL}/api/booking/cancel/${bookingID}`
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
