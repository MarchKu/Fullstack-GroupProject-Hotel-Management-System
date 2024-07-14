"use client"
import React, { useEffect, useState } from "react";
import Sidebar from "@/components/hotel-information/Sidebar";
import Main from "@/components/hotel-information/Main";


const HotelInformation = () => {

  return (
    <div className="w-full flex bg-blue-500">
        <Sidebar />
        <Main />
    </div>
  );
};

export default HotelInformation;
