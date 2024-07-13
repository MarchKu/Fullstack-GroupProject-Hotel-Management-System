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
      className="w-full min-h-[965px] h-[90vh] flex flex-col justify-between items-center px-[5%] md:px-[10%] pb-[10%] pt-[8%] bg-center bg-cover bg-slate-300 bg-blend-multiply "
      style={{ backgroundImage: `url(${background.src})` }}
    >
      <div className="h-[50%] font-heading  text-center text-white flex flex-col justify-center items-center text-[4rem] md:text-[5rem] xl:text-[7rem]">
        <h1 className="h-50% w-full">A Best Place for Your</h1>
        <h1 className="h-50% w-full">Neatly Experience</h1>
      </div>
      <SearchBox />
    </section>
  );
};

export default Hero;
