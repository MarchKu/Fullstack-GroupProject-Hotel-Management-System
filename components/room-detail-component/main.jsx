import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel-about";
import { Card, CardContent } from "@/components/ui/card";
import { carouselAbout } from "@/utils/carousel-info-array/carousel-about";
import { Button } from "@/components/ui/button";

const RoomDetail = () => {
  {
    /* render data */
  }
  const carouselImg = carouselAbout;
  return (
    <section className="w-full h-[150vh] py-[5%] flex flex-col justify-startitem center overflow-hidden">
      <div className="w-screen h-[30%] md:h-[40%]">
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full h-full"
        >
          <CarouselContent className="w-full h-full ">
            {carouselImg.map((img, index) => (
              <CarouselItem key={index}>
                <Card className="w-full h-full">
                  <CardContent className="w-full h-full flex items-center justify-center p-0">
                    <div
                      className="size-full bg-center bg-cover bg-slate-300 bg-ble"
                      style={{ backgroundImage: `url(${img})` }}
                    ></div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
      <div className="w-full h-[60%] pt-[5%] px-[5%] md:px-[15%] flex flex-col gap-[5%] md:gap-[8%]">
        <h2 className="w-full h-[20%] text-[4rem] md:text-[5rem] text-start content-center font-heading text-primary-heading">
          Superior Garden View
        </h2>
        {/* Need to render */}
        <div className="w-full h-[30%] flex flex-col md:flex-row items-center justify-between">
          <div className="w-full md:w-[50%] h-full flex flex-col justify-between font-body md:text-[1.25rem] gap-[1.5rem] md:gap-[2rem]">
            <p className="h-[80%] text-secondary-body">
              {/* render data */}
              Rooms (36sqm) with full garden views, 1 single bed, bathroom with
              bathtub & shower.
            </p>
            <p className="h-[20%] text-secondary-body">
              <span className="pr-2 md:pr-6"> 2 Person</span>
              <span className="px-2 md:px-6 border-l-[1px] border-gray-500 ">
                {/* render data */}1 Double bed
              </span>
              <span className="pl-2 md:pl-6 border-l-[1px] border-gray-500">
                {/* render data */}
                32 sqm
              </span>
            </p>
          </div>
          <div className="w-full md:w-[50%] h-full flex md:flex-col justify-between items-end font-body pt-[1.5rem]">
            <div>
              <p className="text-[1.25rem] text-end text-secondary-body">
                <s>
                  {/* render data */}
                  THB 3,100.00
                </s>
              </p>
              <p className="text-[1.5rem] text-start font-bold">
                {/* render data */}
                THB 2,500.00
              </p>
            </div>

            <Button className="w-[180px] h-[4rem] text-[1.25rem] font-body">
              Book Now
            </Button>
          </div>
        </div>
        <hr />
        <div className="w-full h-[50%]">
          <h3 className="font-body font-bold text-[1.5rem]">Room Amenities</h3>
          <div className="w-full grid md:grid-cols-2 md:text-[1.25rem] font-body pt-8 text-secondary-body">
            {/* render data */}
            <li className=" h-[2rem]">Safe in Room</li>
            <li className=" h-[2rem]">Air Conditioning</li>
            <li className=" h-[2rem]">High speed internet connection</li>
            <li className=" h-[2rem]">Hairdryer</li>
            <li className=" h-[2rem]">Shower</li>
            <li className=" h-[2rem]">Bathroom amenities</li>
            <li className=" h-[2rem]">Lamp</li>
            <li className=" h-[2rem]">Minibar</li>
            <li className=" h-[2rem]">Telephone</li>
            <li className=" h-[2rem]">Ironing board</li>
            <li className=" h-[2rem]">accessible via a guest room key</li>
            <li className=" h-[2rem]">Alarm clock</li>
            <li className=" h-[2rem]">Bathrobe</li>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RoomDetail;
