"use client";

import React, { useEffect, useState } from "react";
import Sidebar from "@/components/hotel-information/Sidebar";
import Main from "@/components/hotel-information/Main";
import { auth, firebaseDB } from "@/utils/firebase-config/firebase";
import { doc, getDoc } from "@firebase/firestore";

const HotelInformation = () => {
  const getAdminData = async () => {
    auth.onAuthStateChanged(async (user) => {
      const docRef = doc(firebaseDB, "admins", user.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const result = docSnap.data();
        localStorage.setItem("adminData", JSON.stringify(result));
      }
    });
  };

  useEffect(() => {
    if (localStorage.getItem("adminToken")) {
      getAdminData();
    }
  }, []);

  return (
    <div className="w-full flex bg-blue-500">
      <Sidebar />
      <Main />
    </div>
  );
};

export default HotelInformation;
