"use client";
import { Inter } from "next/font/google";
import NavbarComponent from "@/components/NavbarComponent";
import FooterComponent from "@/components/FooterComponent";

export default function Home() {
  return (
    <>
      <NavbarComponent />
      <h1 className="text-8xl font-body">Hello</h1>
      <h1 className="text-8xl font-body">Hello</h1>
      <h1 className="text-8xl font-body">Hello</h1>
      <h1 className="text-8xl font-body">Hello</h1>
      <h1 className="text-8xl font-body">Hello</h1>
      <FooterComponent />
    </>
  );
}
