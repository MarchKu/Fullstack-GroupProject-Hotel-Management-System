import { Inter } from "next/font/google";
import NavbarComponent from "@/components/navigation-component/NavbarComponent";

export default function Home() {
  return (
    <>
      <NavbarComponent />
      <h1 className="text-8xl font-body">Hello</h1>
      
    </>
  );
}
