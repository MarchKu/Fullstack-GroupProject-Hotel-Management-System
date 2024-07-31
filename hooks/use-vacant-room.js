import axios from "axios";
import { useState } from "react";

export default function useVacantRoom() {
  const [roomData, setRoomData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const getRoomDeta = async (date) => {
    try {
      if (date) {
        console.log(date);
        setIsLoading(true);
        const result = await axios.get(
          `http://localhost:3000/api/searchVacantRoom`,
          {
            params: {
              date,
            },
          }
        );
        setRoomData(result.data);
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
