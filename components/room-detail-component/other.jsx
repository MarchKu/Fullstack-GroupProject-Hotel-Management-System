
import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel-other";
import { Card, CardContent } from "@/components/ui/card";
import { carouselOther } from "@/utils/carousel-info-array/carousel-other";

import arrow from "../../assets/room&suite/arrow.svg";
import Link from "next/link";

const OtherRoom = () => {
  const carouselImg = carouselOther;
  return (
    <section className="w-full min-h-[500px] md:min-h-[750px] h-[60vh] md:h-[70vh] py-[5%] md:py-[2%] bg-green-200">
      <p className="w-full h-[20%] text-[4rem] md:text-[5rem] text-center content-center font-heading text-primary-heading">
        Other Rooms
      </p>
      <Carousel
        opts={{
          align: "center",
          loop: true, 
        }}
        className="w-full h-[50%] mt-[3rem]"
      >
        <CarouselContent className="w-full h-full ">
          {carouselImg.map((img, index) => (
            <CarouselItem key={index}>
              <Card className="w-full h-full">
                <CardContent className="h-full flex items-center justify-center p-0">
                  <div
                    className="size-full bg-center bg-cover bg-slate-300 bg-blend-multiply flex flex-col justify-end p-[5%]"
                    style={{ backgroundImage: `url(${img.image})` }}
                  >
                    <h3 className="font-heading text-white text-[1.5rem] md:text-[3rem]">
                      {img.category}
                    </h3>
                    <div className="flex gap-2 justify-start items-center">
                      <Link href={`/rooms/${index+1}`} className="font-body text-white hover:underline">
                        Explore Room
                      </Link>
                      <img src={arrow.src} />
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
    </section>
  );
};

export default OtherRoom;
