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
      className="flex flex-col w-full justify-start items-center  py-10 md:pt-[115px] px-4 overflow-hidden"
      id="about"
    >
      <div className="size-full flex flex-col max-w-[1440px] gap-[52px]">
        <div className="w-full h-auto flex flex-col gap-10 md:gap-[52px] md:px-[10%]">
          <h1 className="w-full h-auto font-heading text-primary-heading text-[4rem] md:text-[6rem]">
            {hotelName}
          </h1>
          <div className="w-full h-auto font-body text-primary-heading xl:text-[1.25rem] pl-[20%]">
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
                <CarouselItem
                  key={index}
                  className="basis-[180px] md:basis-[400px]"
                >
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
      </div>
    </section>
  );
};

export default About;
