import axios from "axios";
import { useState } from "react";
import toastr from "toastr";
import "toastr/build/toastr.min.css";

export default function useBooking() {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [discount, setDiscount] = useState(null);
  const [codeError, setCodeError] = useState("");

  const createBooking = async (data) => {
    try {
      setIsLoading(true);
      await axios.post(`http://localhost:3000/api/booking`, data);
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

  const promotionCode = async (code) => {
    try {
      const response = await axios.post(
        `http://localhost:3000/api/promotion`,
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
    promotionCode,
    discount,
    codeError,
    isLoading,
    isError,
  };
}
