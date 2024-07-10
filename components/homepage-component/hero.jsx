import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import background from "../../assets/hero/hero-pic.png";

const Hero = () => {
  return (
    <section
      className="w-full h-[90vh] flex flex-col justify-center items-center px-[5%] md:px-[10%] pb-[10%] pt-[8%] bg-center bg-cover bg-slate-300 bg-blend-multiply md:gap-[20%]"
      style={{ backgroundImage: `url(${background.src})` }}
    >
      <div className="h-[50%] font-heading  text-center text-white flex flex-col justify-center items-center md:text-[7rem] text-[4.5rem]">
        <h1>A Best Place for Your</h1>
        <h1>Neatly Experience</h1>
      </div>
      {/* Mock up component */}

      <Card className="w-full h-[50%] md:h-[250px] px-[2%] py-[4%] ">
        <CardContent className="w-full h-full">
          <form className="w-full h-full pt-4 flex flex-col justify-between items-center md:flex-row md:justify-between md:items-end font-body">
            <div className="flex flex-col space-y-1.5 w-full md:w-[20%]">
              <Label htmlFor="checkin" className=" md:text-[1.25rem]">
                Check In
              </Label>
              <Input
                id="checkin"
                placeholder="-----------"
                className="h-[4rem] text-[1.25rem]"
              />
            </div>
            <div className="flex flex-col space-y-1.5 w-full md:w-[20%]">
              <Label htmlFor="checkout" className=" md:text-[1.255rem]">
                Check out
              </Label>
              <Input
                id="checkout"
                placeholder="-----------"
                className="h-[4rem] text-[1.25rem]"
              />
            </div>
            <div className="flex flex-col space-y-1.5 w-full md:w-[20%]">
              <Label htmlFor="room&guests" className=" md:text-[1.25rem]">
                Room & Guests
              </Label>
              <Input
                id="room&guests"
                placeholder="-----------"
                className="h-[4rem] text-[1.25rem]"
              />
            </div>
            <Button className="w-[20%] h-[4rem] md:text-[1.25rem]">
              Search
            </Button>
          </form>
        </CardContent>
      </Card>
    </section>
  );
};

export default Hero;
