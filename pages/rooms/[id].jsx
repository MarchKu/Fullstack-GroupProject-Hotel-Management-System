"use client";
import React from "react";
import RoomDetail from "@/components/room-detail-component/main";
import OtherRoom from "@/components/room-detail-component/other";
import NavbarComponent from "@/components/navigation-component/NavbarComponent";
import FooterComponent from "@/components/footer-component/FooterComponent";
import { useState,useEffect } from "react";

function main() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(Boolean(token));
  }, []);
  return (
    <>
      <NavbarComponent isAuthenticated={isAuthenticated}/>
      <RoomDetail />
      <OtherRoom/>
      <FooterComponent/>
    </>
  );
}
export default main;
