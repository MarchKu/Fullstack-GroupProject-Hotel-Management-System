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
import useUserProfile from "@/hooks/use-user-profile";
import useHotelData from "@/hooks/use-hotel-data";

export default function Home() {
  const { userData, getUserProfile, putUserProfile, isLoading, isError } =
    useUserProfile();
  const { hotelData, getHotelData } = useHotelData();
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  useEffect(() => {
    const fetchUserData = async () => {
      const userData = localStorage.getItem("user");
      if (userData) {
        const parsedData = JSON.parse(userData);
        setUser(parsedData);
      }
    };
    fetchUserData();
    getHotelData();
  }, []);

  /* Data fetching */
  useEffect(() => {
    if (user) {
      getUserProfile(user.username);
    }
    console.log(userData);
  }, [user]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(Boolean(token));
  }, []);

  return (
    <section className="flex flex-col items-center">
      <NavbarComponent />
      <Hero />
      {hotelData ? (
        <About
          hotelName={hotelData.data.hotel_name}
          hotelDescription={hotelData.data.hotel_description}
        />
      ) : (
        <About hotelName="Hotel Name" hotelDescription="Hotel Description" />
      )}

      <Service />
      <RoomSuite />
      <Testimonial />
      <FooterComponent />
    </section>
  );
}
