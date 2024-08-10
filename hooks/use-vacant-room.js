import axios from "axios";
import { useState } from "react";

export default function useVacantRoom() {
  const [roomData, setRoomData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const getRoomDeta = async (searchData) => {
    try {
      if (searchData) {
        setIsLoading(true);
        const result = await axios.get(
          `https://neatly-hotel.vercel.app/api/searchVacantRoom?check_in=${searchData.check_in}&check_out=${searchData.check_out}&guests=${searchData.guests}`
        );
        setRoomData(result.data);
        console.log(result.data);

        setIsLoading(false);
        setIsError(false);
      }
    } catch (error) {
      console.error(error);
      setIsLoading(false);
      setIsError(true);
    }
  };

  return { roomData, getRoomDeta, isLoading, isError };
}
