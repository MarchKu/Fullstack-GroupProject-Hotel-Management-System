
import axios from "axios";
import { useState} from "react";


export default function useRoomData() {
  const [userProfile, setUserProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);


  const getUserProfile = async (username) => {
    try {
      if (id) {
        setIsLoading(true);
        const result = await axios.get(`http://localhost:3000/api/user-profile/${username}`);
        setUserProfile(result.data[0]);
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
        setUserProfile(result.data);
        setIsLoading(false);
        setIsError(false)
    }catch (error) {
      console.error(error);
      setIsLoading(false)
      setIsError(true)
    }
  }
  return {userProfile,getUserProfile,getAllRoomsData,isLoading,isError}
}
