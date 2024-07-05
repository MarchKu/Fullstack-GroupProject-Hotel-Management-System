import Image from "next/image";
import { Inter } from "next/font/google";
import { Heading1 } from "lucide-react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <h1 className="text-8xl font-body">Hello</h1>
  );
} 
