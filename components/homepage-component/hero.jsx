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
      className="w-full min-h-[92vh] md:h-[92vh] flex flex-col justify-center items-center gap-[57px] md:gap-[124px] px-4 pb-[46px]  bg-center bg-cover bg-slate-300 bg-blend-multiply overflow-hidden"
      style={{ backgroundImage: `url(${background.src})` }}
    >
      <div className="size-full max-w-[1440px] flex flex-col justify-center items-center gap-[1.5rem] md:gap-[10%]">
        <div className="font-heading text-center text-white flex flex-col justify-center items-center ">
          <h1 className="w-full text-[44px] md:text-[88px] xl:text-[6rem]">
            A Best Place for Your Neatly Experience
          </h1>
        </div>
        <div className="w-full max-w-[340px] md:max-w-[1000px] lg:max-w-[1200px] lg:w-full flex justify-center bg-white rounded-md">
          <SearchBox onDateChage={() => true} />
        </div>
      </div>
    </section>
  );
};

export default Hero;
