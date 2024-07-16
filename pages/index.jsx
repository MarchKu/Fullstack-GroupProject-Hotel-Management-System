"use client";

import Hero from "@/components/homepage-component/hero";
import About from "@/components/homepage-component/about";
import Service from "@/components/homepage-component/service";
import RoomSuite from "@/components/homepage-component/room&suite";
import Testimonial from "@/components/homepage-component/testimonial";
import FooterComponent from "@/components/footer-component/FooterComponent";
import NavbarComponent from "@/components/navigation-component/NavbarComponent";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [hotelData, setHotelData] = useState({});

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(Boolean(token));

    const getHotelData = async () => {
      const result = await axios.get("http://localhost:3000/api/getHotelData");
      setHotelData(result.data.data);
    };

    getHotelData();
  }, []);

  return (
    <>
      <NavbarComponent isAuthenticated={isAuthenticated} />
      <Hero />
      <About
        hotelName={hotelData.hotel_name}
        hotelDescription={hotelData.hotel_description}
      />
      <Service />
      <RoomSuite />
      <Testimonial />
      <FooterComponent />
    </>
  );
}
