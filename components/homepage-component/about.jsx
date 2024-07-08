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

const About = () => {
  const carouselImg = carouselAbout;
  return (
    <section className="flex flex-col w-full h-[100vh] md:h-[130vh] pt-[6%] pb-[4%]">
      <div className="w-full h-[60%] flex flex-col gap-10 px-[5%] md:px-[10%]">
        <h1 className="font-heading text-[4.5rem] text-center text-primary-heading md:text-[7rem] md:text-left">
          Neatly Hotel
        </h1>
        <div className="flex flex-col font-body text-[1.3rem] text-gray-700 gap-[1.5rem] 2xl:text-[1.7rem] md:pl-[20%] md:pt-10">
          <p>
            Set in Bangkok, Thailand. Neatly Hotel offers 5-star accommodation
            with an outdoor pool, kids' club, sports facilities and a fitness
            centre. There is also a spa, an indoor pool and saunas.
          </p>
          <p>
            All units at the hotel are equipped with a seating area, a
            flat-screen TV with satellite channels, a dining area and a private
            bathroom with free toiletries, a bathtub and a hairdryer. Every room
            in Neatly Hotel features a furnished balcony. Some rooms are
            equipped with a coffe e machine.
          </p>
          <p>
            Free WiFi and entertainment facilities are available at property and
            also rentals are provided to explore the area.
          </p>
        </div>
      </div>
      <div className="w-screen h-[50%] flex justify-center">
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
                  <CardContent className="h-full flex items-center justify-center p-0">
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
    </section>
  );
};

export default About;
