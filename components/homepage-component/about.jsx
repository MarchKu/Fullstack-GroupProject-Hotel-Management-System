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

const About = ({ hotelName, hotelDescription }) => {
  const carouselImg = carouselAbout;
  return (
    <section
      className="flex flex-col w-full max-w-[1440px] md:h-[120vh] gap-10 xl:gap-[10%] py-10 md:pt-[115px] px-4 overflow-hidden"
      id="about"
    >
      <div className="w-full flex flex-col gap-10 md:gap-[52px] md:px-[10%]">
        <h1 className="font-heading text-primary-heading md:text-[68px] text-[44px] leading-[55px] xl:text-[7rem] md:text-left">
          {hotelName}
        </h1>
        <div className=" flex flex-col font-body text-gray-700 gap-[1.5rem] text-base md:text-base lg:text-[1rem] xl:text-[1.5rem] md:pl-[192px]">
          <p>{hotelDescription}</p>
        </div>
      </div>
      <div className="w-full h-[225px] md:h-[500px] flex justify-center">
        <Carousel
          opts={{
            align: "center",
            loop: true,
          }}
          className="w-full h-full"
        >
          <CarouselContent className="w-full h-full ">
            {carouselImg.map((img, index) => (
              <CarouselItem key={index} className="basis-1/3">
                <Card className="">
                  <CardContent className="h-full flex items-center justify-center p-0">
                    <div
                      className="w-full h-[225px] md:h-[500px] bg-center bg-cover bg-slate-300 bg-blend-multiply"
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
    </section>
  );
};

export default About;
