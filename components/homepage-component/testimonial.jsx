import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel-testimonial";
import { Card, CardContent } from "@/components/ui/card";
import Autoplay from "embla-carousel-autoplay";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { carouselTestimonial } from "@/utils/carousel-info-array/carousel-testimonial";

const Testimonial = () => {
  const carouselInfo = carouselTestimonial;
  return (
    <section className="w-full h-[70vh] bg-green-200 flex flex-col gap-[2rem]">
      <h2 className="w-full h-[20%] text-[4.5rem] md:text-[7rem] font-heading text-center content-center text-primary-heading">
        Our Customer Says
      </h2>
      <div className="h-[80%]">
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          plugins={[
            Autoplay({
              delay: 8000,
              stopOnInteraction: false,
              stopOnMouseEnter: true,
            }),
          ]}
        >
          <CarouselContent className="h-full">
            {carouselInfo.map((info, index) => (
              <CarouselItem key={index}>
                <Card className="size-full rounded-none bg-green-200 px-[5%] md:px-[10%]">
                  <CardContent className="h-full flex items-center justify-center p-0">
                    <div className="size-full flex flex-col justify-start items-center gap-10 pt-[8%]">
                      <p className="w-full text-center text-[1.5rem] md:text-[2.5rem] font-body px-0 md:px-[10%] text-primary-heading">
                        {info.review}
                      </p>
                      <div className="flex gap-5 justify-center items-center">
                        <Avatar className="size-[3rem] md:size-[4rem]">
                          <AvatarImage
                            src={info.avatar}
                            className=" object-cover object-center"
                          />
                          <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <p className="font-body text-[1.25rem] md:text-[2rem] text-gray-600">{info.name}</p>
                      </div>
                    </div>
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

export default Testimonial;
