"use client";

import React, { useEffect, useState } from "react";
import Sidebar from "@/components/hotel-information/Sidebar";
import Main from "@/components/hotel-information/Main";

const HotelInformation = () => {
  // const getAdminData = async () => {
  //   auth.onAuthStateChanged(async (user) => {
  //     const docRef = doc(firebaseDB, "admins", user.uid);
  //     const docSnap = await getDoc(docRef);
  //     if (docSnap.exists()) {
  //       const result = docSnap.data();
  //       localStorage.setItem("admin", JSON.stringify(result));
  //     }
  //   });
  // };

  // useEffect(() => {
  //   getAdminData();
  // }, []);

  return (
    <div className="w-full flex bg-[#2F3E35]">
      <Sidebar />
      <Main />
    </div>
  );
};

export default HotelInformation;
