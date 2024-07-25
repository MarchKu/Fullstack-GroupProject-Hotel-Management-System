import axios from "axios";
import { useState } from "react";

export default function useUserProfile() {
  const [userProfile, setUserProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const getUserProfileByUsername = async (username) => {
    try {
      if (username) {
        setIsLoading(true);
        const result = await axios.get(
          `http://localhost:3000/api/user-profile/${username}`
        );
        setUserProfile(result.data);
        setIsLoading(false);
        setIsError(false);
      }
    } catch (error) {
      console.error(error);
      setIsLoading(false);
      setIsError(true);
    }
  };
  return { userProfile, getUserProfileByUsername, isLoading, isError };
}
