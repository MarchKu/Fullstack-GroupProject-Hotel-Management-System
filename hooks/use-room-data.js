
import axios from "axios";
import { useState} from "react";


export default function useRoomData() {
  const [roomData, setRoomData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);


  const getRoomDetailByID = async (id) => {
    try {
      if (id) {
        setIsLoading(true);
        const result = await axios.get(`http://localhost:3000/api/room/${id}`);
        setRoomData(result.data[0]);
        setIsLoading(false);
        setIsError(false)
      }
    } catch (error) {
      console.error(error);
      setIsLoading(false)
      setIsError(true)
    }
  };

  const getAllRoomsData = async () =>{
    try{
      setIsLoading(true);
        const result = await axios.get(`http://localhost:3000/api/rooms`);
        setRoomData(result.data);
        setIsLoading(false);
        setIsError(false)
    }catch (error) {
      console.error(error);
      setIsLoading(false)
      setIsError(true)
    }
  }
  return {roomData,getRoomDetailByID,getAllRoomsData,isLoading,isError}
}