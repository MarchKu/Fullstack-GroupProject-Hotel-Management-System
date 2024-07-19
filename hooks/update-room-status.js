import axios from "axios";
import { useState } from "react";
export default function useUpdateRoomStatus() {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const updateStatus = async (roomId, newStatus) => {
    try {
      setIsLoading(true);
      await axios.put(`http://localhost:3000/api/updateRoomStatus-Admin/`, {
        roomId,
        status: newStatus,
      });
      setIsLoading(false);
      setIsError(false);
      getRoom();
    } catch (error) {
      console.error(error);
      setIsLoading(false);
      setIsError(true);
    }
  };
  return { updateStatus, isLoading, isError };
}
