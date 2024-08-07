"use client";

import React, { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
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
  const router = useRouter();

  const createBooking = async (data) => {
    try {
      setIsLoading(true);
      const result = await axios.post(
        `http://localhost:3000/api/booking`,
        data
      );
      localStorage.setItem("bookingId", JSON.stringify(result.data.bookingId));
      const query = {
        username: `${data.user_name}`,
        bookingID: result.data.bookingId,
      };
      await getBookingData(result.data.bookingId);
      router.push({ pathname: "/booking", query: query });
      toastr["success"]("You are successfully booking");
      setIsLoading(false);
      setIsError(false);
    } catch (error) {
      console.log(error.message);
      toastr["error"]("Booking Failed");
      setIsLoading(false);
      setIsError(true);
    }
  };

  const getBookingData = async (bookingId) => {
    try {
      setIsLoading(true);
      const result = await axios.get(
        `http://localhost:3000/api/booking?bookingID=${bookingId}`
      );
      setBookingData(result.data);
      setIsLoading(false);
      setIsError(false);
    } catch (error) {
      console.log(error.message);
      setIsLoading(false);
      setIsError(true);
    }
  };

  const updateBookingData = async (data) => {
    console.log(data);

    try {
      await axios.patch(`http://localhost:3000/api/booking`, data);
      await getBookingData(data.booking_id);
      return "succuss";
    } catch (error) {
      console.log(error.message);
    }
  };

  const deleteUncompleteBooking = async (bookingId) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/booking?bookingID=${bookingId}`
      );
      const booking = response.data;

      if (
        booking.status === "Booking Initiated" ||
        booking.status === "Request Completed"
      ) {
        await axios.delete(
          `http://localhost:3000/api/booking?bookingID=${bookingId}`
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
        `http://localhost:3000/api/promotion?code=${code}`
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
        codeError,
        isLoading,
        isError,
        totalPrice,
        setTotalPrice,
        timeLeft,
        setTimeLeft,
      }}
    >
      {props.children}
    </BookingContext.Provider>
  );
}
const useBookingContext = () => React.useContext(BookingContext);

export { BookingContextProvider, useBookingContext };
