import axios from "axios";
import { revalidatePath } from "next/cache";
import { useState } from "react";
import toastr from "toastr";
import "toastr/build/toastr.min.css";

export default function useUserProfile() {
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const getUserProfile = async (username) => {
    try {
      if (username) {
        setIsLoading(true);
        const result = await axios.get(
          `http://localhost:3000/api/user-profile/${username}`,
          {
            headers: {
              "Cache-Control": "no-store",
            },
          }
        );
        setUserData(result.data);
        setIsLoading(false);
        setIsError(false);
      }
    } catch (error) {
      console.error(error);
      setIsLoading(false);
      setIsError(true);
    }
  };

  const putUserProfile = async (username, data) => {
    try {
      setIsLoading(true);
      const response = await axios.put(
        `http://localhost:3000/api/user-profile/${username}`,
        data,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      toastr["success"]("You are successfully update your profile");
      setTimeout(function () {
        window.location.replace("/profile");
      }, 1000);
      setIsLoading(false);
      setIsError(false);
    } catch (error) {
      console.log(error.message);
      toastr["error"](error.message);
      setIsLoading(false);
      setIsError(true);
    }
  };
  return { userData, getUserProfile, putUserProfile, isLoading, isError };
}
