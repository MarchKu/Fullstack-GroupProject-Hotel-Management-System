import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import background from "../../asset/hero/hero-pic.png";

const Hero = () => {
  return (
    <section
      className="w-full h-[90vh] flex flex-col justify-between items-center px-[10%] pb-[10%] pt-[8%] bg-center bg-cover bg-slate-300 bg-blend-multiply "
      style={{ backgroundImage: `url(${background.src})` }}
    >
      <div className="font-heading text-[8rem] text-center text-white">
        <h1>A Best Place for Your</h1>
        <h1>Neatly Experience</h1>
      </div>
      {/* Mock up component */}
      <Card className="w-full px-[2%] py-[4%]">
        <CardContent>
          <form className="flex flex-row justify-between items-end font-body">
            <div className="flex flex-col space-y-1.5 w-[20%] h-full">
              <Label htmlFor="checkin" className=" text-[1.5rem]">
                Check In
              </Label>
              <Input
                id="checkin"
                placeholder="-----------"
                className="h-[4rem] text-[1.5rem]"
              />
            </div>
            <div className="flex flex-col space-y-1.5 w-[20%]">
              <Label htmlFor="checkout" className=" text-[1.5rem]">
                Check out
              </Label>
              <Input
                id="checkout"
                placeholder="-----------"
                className="h-[4rem] text-[1.5rem]"
              />
            </div>
            <div className="flex flex-col space-y-1.5 w-[20%]">
              <Label htmlFor="room&guests" className=" text-[1.5rem]">
                Room & Guests
              </Label>
              <Input
                id="room&guests"
                placeholder="-----------"
                className="h-[4rem] text-[1.5rem]"
              />
            </div>
            <Button className="w-[20%] h-[4rem] text-[1.5rem]">Search</Button>
          </form>
        </CardContent>
      </Card>
    </section>
  );
};

export default Hero;
