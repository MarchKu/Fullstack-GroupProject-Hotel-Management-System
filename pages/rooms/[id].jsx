"use client";
import React from "react";
import RoomDetail from "@/components/room-detail-component/main";
import OtherRoom from "@/components/room-detail-component/other";
import FooterComponent from "@/components/footer-component/FooterComponent";
import { useState, useEffect } from "react";

function Main() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(Boolean(token));
  }, []);
  return (
    <>
      <RoomDetail />
      <OtherRoom />
      <FooterComponent />
    </>
  );
}
export default Main;
