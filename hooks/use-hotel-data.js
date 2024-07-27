import axios from "axios";
import { set } from "date-fns";
import { useState } from "react";

export default function useHotelData() {
  const [hotelData, setHotelData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const getHotelData = async () => {
    const result = await axios.get("http://localhost:3000/api/getHotelData");
    try {
      if (result) {
        setHotelData(result.data);
        setIsLoading(false);
        setIsError(false);
      }
    } catch (error) {
      console.error(error);
      setIsLoading(false);
      setIsError(true);
    }
  };

  return { hotelData, getHotelData, isLoading, isError };
}
