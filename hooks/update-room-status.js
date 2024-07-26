import axios from "axios";
import { useState } from "react";
export default function useUpdateRoomStatus() {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const updateStatus = async (roomId, newStatus) => {
    try {
      setIsLoading(true);
      console.log(
        `Sending update request for room ${roomId} with status ${newStatus}`
      );
      await axios.put(`http://localhost:3000/api/updateRoomStatus-Admin/`, {
        room_id: roomId,
        status: newStatus,
      });
      setIsLoading(false);
      setIsError(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
      setIsError(true);
    }
  };
  return { updateStatus, isLoading, isError };
}
