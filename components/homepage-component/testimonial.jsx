import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel_testimonial";
import { Card, CardContent } from "@/components/ui/card";
import Autoplay from "embla-carousel-autoplay";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { carouselTestimonial } from "@/utils/carousel-info-array/carousel-testimonial";

const Testimonial = () => {
  const carouselInfo = carouselTestimonial;
  return (
    <section className="w-full h-[70vh] bg-green-200">
      <h2 className="w-full text-[7rem] font-heading text-center content-center pt-[3%] text-primary-heading">
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
                <Card className="size-full rounded-none bg-green-200 px-[10%]">
                  <CardContent className="h-full flex items-center justify-center p-0">
                    <div className="size-full flex flex-col justify-start items-center gap-16 pt-[8%]">
                      <p className="w-full text-center text-[2.5rem] font-body px-[10%] text-primary-heading">
                        {info.review}
                      </p>
                      <div className="flex gap-5 justify-center items-center">
                        <Avatar className="size-[4rem]">
                          <AvatarImage
                            src={info.avatar}
                            className=" object-cover object-center"
                          />
                          <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <p className="font-body text-[2rem] text-gray-600">{info.name}</p>
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
