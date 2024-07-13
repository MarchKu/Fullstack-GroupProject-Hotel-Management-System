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
    <section className="flex flex-col w-full min-h-[1200px] h-screen md:h-[120vh] gap-[5%] xl:gap-[10%] py-[5%] overflow-hidden">
      <div className="w-full h-[40%] flex flex-col  px-[5%] md:px-[10%]">
        <h1 className="h-[20%] font-heading text-center content-center text-primary-heading md:text-[5rem] text-[4rem] xl:text-[7rem] md:text-left">
          Neatly Hotel
        </h1>
        <div className=" h-[80%] flex flex-col font-body text-gray-700 gap-[1.5rem] text-[1rem] md:text-[1rem] lg:text-[1rem] xl:text-[1.5rem] md:pl-[20%] md:pt-[5%]">
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
