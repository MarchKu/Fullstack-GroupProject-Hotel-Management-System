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
      className="flex flex-col w-full min-h-[1200px] h-screen md:h-[120vh] gap-[5%] xl:gap-[10%] py-[5%] overflow-hidden"
      id="about"
    >
      <div className="w-full h-[40%] flex flex-col  px-[5%] md:px-[10%]">
        <h1 className="h-[20%] font-heading text-center content-center text-primary-heading md:text-[5rem] text-[4rem] xl:text-[7rem] md:text-left">
          {hotelName}
        </h1>
        <div className=" h-[80%] flex flex-col font-body text-gray-700 gap-[1.5rem] text-[1rem] md:text-[1rem] lg:text-[1rem] xl:text-[1.5rem] md:pl-[20%] md:pt-[5%]">
          <p>{hotelDescription}</p>
        </div>
      </div>
      <div className="w-screen h-[50%] flex justify-center">
        <Carousel
          opts={{
            align: "center",
            loop: true,
          }}
          className="w-full h-full"
        >
          <CarouselContent className="w-full h-full ">
            {carouselImg.map((img, index) => (
              <CarouselItem key={index}>
                <Card className="w-screen md:w-full h-full">
                  <CardContent className="h-full flex items-center justify-center p-0">
                    <div
                      className="size-full bg-center bg-cover bg-slate-300 bg-blend-multiply"
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
