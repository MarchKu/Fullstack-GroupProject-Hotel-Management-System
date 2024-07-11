"use client"
import React from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";


export default function useRoomData() {
  const [roomData, setRoomData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);


  const getDataByID = async (id) => {
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
  return {roomData,getDataByID,isLoading,isError}
}
