"use client";

import Hero from "@/components/homepage-component/hero";
import About from "@/components/homepage-component/about";
import Service from "@/components/homepage-component/service";
import RoomSuite from "@/components/homepage-component/room&suite";
import Testimonial from "@/components/homepage-component/testimonial";
import FooterComponent from "@/components/footer-component/FooterComponent";
import NavbarComponent from "@/components/navigation-component/NavbarComponent";
import { useState, useEffect } from "react";

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(Boolean(token));
  }, []);

  return (
    <>
      <NavbarComponent isAuthenticated={isAuthenticated} />
      <Hero />
      <About />
      <Service />
      <RoomSuite />
      <Testimonial />
      <FooterComponent />
    </>
  );
}
