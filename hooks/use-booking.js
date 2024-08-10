import axios from "axios";
import { useState } from "react";
import toastr from "toastr";
import "toastr/build/toastr.min.css";
import { useRouter } from "next/router";

export default function useBooking() {
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
        `https://neatly-hotel.vercel.app/api/booking`,
        data
      );
      localStorage.setItem("bookingId", JSON.stringify(result.data.bookingId));
      const query = {
        username: `${data.user_name}`,
        bookingID: result.data.bookingId,
      };
      // router.push({ pathname: "/booking" });
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
        `https://neatly-hotel.vercel.app/api/booking?bookingID=${bookingId}`
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
    try {
      await axios.patch(`https://neatly-hotel.vercel.app/api/booking`, data);
    } catch (error) {
      console.log(error.message);
    }
  };

  const deleteBookingData = async () => {
    try {
      await axios.delete(
        `https://neatly-hotel.vercel.app/api/booking?bookingID=${bookingId}`
      );
    } catch (error) {
      console.log(error.message);
    }
  };

  const promotionCode = async (code) => {
    try {
      const response = await axios.post(
        `https://neatly-hotel.vercel.app/api/promotion`,
        code
      );

      const data = response.data;
      console.log(data);

      if (data.valid) {
        setDiscount(data.discount);
        setCodeError("");
      } else {
        setDiscount(null);
        setCodeError("Invalid or expired promotion code.");
      }
    } catch {
      setDiscount(null);
      setCodeError("Invalid or expired promotion code.");
    }
  };

  return {
    createBooking,
    getBookingData,
    bookingData,
    updateBookingData,
    deleteBookingData,
    promotionCode,
    discount,
    codeError,
    isLoading,
    isError,
  };
}
