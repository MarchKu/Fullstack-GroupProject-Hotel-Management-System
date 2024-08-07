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
import emblaCarouselAutoplay from "embla-carousel-autoplay";

const Testimonial = () => {
  const carouselInfo = carouselTestimonial;
  return (
    <section className="w-full max-w-[1440px] bg-green-200 flex flex-col gap-10 md:gap-[72px] py-10 md:pb-[178px] px-4 md:pt-[125px]">
      <h2 className="w-full h-[20%] text-[44px] leading-[55px] md:text-[5rem] lg:text-[6rem] font-heading text-center content-center text-primary-heading">
        Our Customer Says
      </h2>
      <div className="pb-[128px] md:pb-10">
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
          <CarouselContent className="h-full select-none ">
            {carouselInfo.map((info, index) => (
              <CarouselItem key={index}>
                <Card className="size-full rounded-none bg-green-200 border-0">
                  <CardContent className="h-full flex items-center justify-between p-0">
                    <div className="size-full flex flex-col justify-start items-center gap-8">
                      <p className="w-full text-center text-xl font-body px-0 md:px-[10%] text-primary-heading">
                        {info.review}
                      </p>
                      <div className="flex gap-4 justify-center items-center">
                        <Avatar className="size-8 md:size-[4rem]">
                          <AvatarImage
                            src={info.avatar}
                            className=" object-cover object-center"
                          />
                          <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <p className="font-body text-base md:text-[1.5rem] text-gray-600">
                          {info.name}
                        </p>
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
