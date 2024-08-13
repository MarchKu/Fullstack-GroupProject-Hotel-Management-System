"use client";

import React, { useState, useCallback } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import format from "date-fns/format";
import toastr from "toastr";

const BookingContext = React.createContext();

function BookingContextProvider(props) {
  const [searchData, setSearchData] = useState();
  const [totalPrice, setTotalPrice] = useState();
  const [timeLeft, setTimeLeft] = useState(300);

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [discount, setDiscount] = useState(null);
  const [codeError, setCodeError] = useState("");
  const [bookingData, setBookingData] = useState();
  const [isRoomBooked, setIsRoomBooked] = useState(false);
  const [userData, setUserData] = useState();
  const router = useRouter();
  const API_BASE_URL =
    "http://localhost:3000" || "https://neatly-hotel.vercel.app";

  const createBooking = async (data) => {
    try {
      setIsLoading(true);
      const result = await axios.post(`${API_BASE_URL}/api/booking`, data);
      const query = {
        username: `${data.user_name}`,
        bookingID: result.data.bookingId,
        bookingStep: 1,
      };
      await getBookingData(result.data.bookingId);
      router.push({ pathname: "/booking", query: query });
    } catch (error) {
      console.log(error.message);
    }
  };

  const getBookingData = useCallback(async (bookingId) => {
    try {
      setIsLoading(true);
      const result = await axios.get(
        `${API_BASE_URL}/api/booking?bookingID=${bookingId}`
      );
      setBookingData(result.data);
      setIsLoading(false);
      setIsError(false);
    } catch (error) {
      console.log(error.message);
      setIsLoading(false);
      setIsError(true);
    }
  }, []);

  const updateBookingData = useCallback(async (data) => {
    try {
      await axios.patch(`${API_BASE_URL}/api/booking`, data);
      await getBookingData(data.booking_id);
      return true;
    } catch (error) {
      console.log(error.message);
    }
  }, []);

  const deleteUncompleteBooking = async (bookingId) => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/api/booking?bookingID=${bookingId}`
      );
      const booking = response.data;

      if (
        booking.status === "Booking Initiated" ||
        booking.status === "Request Completed"
      ) {
        await axios.delete(
          `${API_BASE_URL}/api/booking?bookingID=${bookingId}`
        );
        console.log("Booking deleted successfully");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const promotionCode = async (code) => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/api/promotion?code=${code}`
      );
      const data = response.data;
      if (data.valid) {
        setDiscount(data.discount);
        setCodeError("");
      } else {
        setDiscount(null);
        setCodeError("Invalid or expired promotion code.");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const checkRoomBooked = useCallback(async () => {
    try {
      const newFormatDate = {
        checkIn: format(bookingData.check_in, "EEE, dd MMM yyyy"),
        checkOut: format(bookingData.check_out, "EEE, dd MMM yyyy"),
      };
      const result = await axios.get(
        `${API_BASE_URL}/api/isRoomBooked?room_id=${bookingData.room_id}&check_in=${newFormatDate.checkIn}&check_out=${newFormatDate.checkOut}`
      );
      const isBooked = result.data[0].is_booked;

      if (isBooked) {
        setIsRoomBooked(isBooked);
      } else {
        setIsRoomBooked(isBooked);
      }
      return !isBooked;
    } catch (error) {
      console.log(error.message);
    }
  }, [bookingData]);

  const getUserData = useCallback(async (username) => {
    if (username) {
      const result = await axios.get(
        `https://neatly-hotel.vercel.app/api/user-profile/${username}`
      );
      setUserData(result.data);
    }
  }, []);

  return (
    <BookingContext.Provider
      value={{
        searchData,
        setSearchData,
        createBooking,
        getBookingData,
        bookingData,
        updateBookingData,
        deleteUncompleteBooking,
        promotionCode,
        discount,
        setDiscount,
        codeError,
        isLoading,
        isError,
        totalPrice,
        setTotalPrice,
        timeLeft,
        setTimeLeft,
        checkRoomBooked,
        isRoomBooked,
        setIsRoomBooked,
        getUserData,
        userData,
      }}
    >
      {props.children}
    </BookingContext.Provider>
  );
}
const useBookingContext = () => React.useContext(BookingContext);

export { BookingContextProvider, useBookingContext };
