import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import background from "../../assets/hero/hero-pic.png";
import { SearchBox } from "../search-component/SearchBox";

const Hero = () => {
  return (
    <section
      className="w-full md:h-[900px] flex flex-col items-center gap-[57px] md:gap-[124px] px-4 pb-[46px] pt-[100px] md:pt-[215px] bg-center bg-cover bg-slate-300 bg-blend-multiply "
      style={{ backgroundImage: `url(${background.src})` }}
    >
      <div className="font-heading  text-center text-white flex flex-col justify-center items-center ">
        <h1 className="w-full text-[44px] md:text-[88px]">
          A Best Place for Your Neatly Experience
        </h1>
      </div>
      <div className="w-full max-w-[1040px] flex justify-center rounded-lg">
        <SearchBox onDateChage={() => true} />
      </div>
    </section>
  );
};

export default Hero;
