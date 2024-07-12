import { useState } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import vector from "../../assets/search_result/vector.svg";
import { arrRoomImage } from "@/utils/carousel-info-array/carousel-search-result";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog-room-popup";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel-room-pop-up";

import { SearchBox } from "@/components/search-component/SearchBox";
import FooterComponent from "@/components/footer-component/FooterComponent";
import NavbarComponent from "@/components/navigation-component/NavbarComponent";

import useRoomData from "@/hooks/use-room-data";
import { useEffect } from "react";
import { useRouter } from "next/router";

export default function Search_result() {
  const [isRoomdetailOpen, setIsRoomDetailOpen] = useState(false);
  const [isRoomImgOpen, setIsRoomImgOpen] = useState(false);

  const handlePopUpRoomDetail = () => {
    setIsRoomDetailOpen(true);
  };

  const handlePopUpRoomImage = () => {
    setIsRoomImgOpen(true);
  };

  // get room data

  const { roomData, getAllRoomsData, isLoading, isError } = useRoomData();
  const fetchData = async () => {
    await getAllRoomsData();
    console.log(roomData);
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }
  if (isError) {
    return <h1>Error fetching data</h1>;
  }

  return roomData ? (
    <>
      <div className="flex flex-col justify-center items-center font-body">
        <div className="w-full h-24 border">
          <NavbarComponent />
        </div>
        <div className=" w-full h-[400px] flex border-1 border-gray-200 p-4 bg-rose-400 rounded shadow-xl shadow-gray-200 bg-white justify-center items-center md:h-[150px] md:sticky md:top-0 md:z-10 ">
          <SearchBox />
        </div>
        {/* room search result */}/{" "}
        <div className="w-full flex flex-col items-center md:mt-12 md:mb-28 md:z-0">
          {roomData.map((room, index) => {
            return (
              <div
                key={index}
                className=" mt-12 pb-4 border-b border-gray-300 flex flex-col justify-center md:max-w-[1120px] md:h-[400px] md:flex-row md:justify-between md:items-center md:mt-0 md:pb-0"
              >
                <div className="relative md:w-[450px] md:h-[320px] borde">
                  <img
                    onClick={handlePopUpRoomImage}
                    className="object-cover md:w-[full] md:h-[320px] hover:cursor-pointer"
                    src={room.gallery_images[1]}
                    alt="garden view"
                  />
                  <Image src={vector} className="absolute bottom-0 left-0" />
                </div>

                <div className="p-4 flex flex-col md:max-w-[620px] md:h-[320px] md:justify-between md:pl-8">
                  <div className="md:flex">
                    <div className="basis-[55%]">
                      <h1 className="w-full text-[28px] font-semibold">
                        {room.type_name}
                      </h1>
                      <div className="w-full text-gray-700 flex gap-4 my-4">
                        <span>{room.room_capacity} Guests</span>
                        <span className="text-gray-500">|</span>
                        <span>{room.bed_type}</span>
                        <span className="text-gray-500">|</span>
                        <span>{room.room_size}</span>
                      </div>
                      <p className="w-full text-gray-700 mb-4">
                        {room.room_description}
                      </p>
                    </div>
                    <div className="basis-[45%] text-right my-0">
                      <div>
                        <p className="line-through text-gray-700">
                          THB {room.current_price}
                        </p>
                        <p className="text-xl font-semibold">
                          {room.promotional_price}
                        </p>
                      </div>
                      <div className="my-4">
                        <p className="text-gray-700">Per Night</p>
                        <p className="text-gray-700">
                          (Including Taxes & Fees)
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="w-[90%] flex flex-row  justify-end self-end">
                    <Button
                      variant="ghost"
                      onClick={handlePopUpRoomDetail}
                      className="w-40 text-orange-500 hover:text-orange-400 hover:bg-white"
                    >
                      Room Detail
                    </Button>
                    <Button className="w-40 rounded">Book Now</Button>
                  </div>

                  <Dialog
                    open={isRoomdetailOpen}
                    onOpenChange={setIsRoomDetailOpen}
                  >
                    <DialogContent className="sm:max-w-[800px] h-[620px] ">
                      <DialogHeader className="h-[60px] px-4 md:px-20 border-b flex flex-row items-center">
                        <DialogClose className="h-0 absolute top-0 right-0">
                          <X className="m-4" />
                        </DialogClose>
                        <DialogTitle className="text-xl font-semibold">
                          {room.type_name}
                        </DialogTitle>
                      </DialogHeader>
                      <ScrollArea>
                        <div className="w-full px-4 mb-8 flex flex-col gap-4 md:px-4 lg:px-20">
                          <Carousel
                            opts={{
                              align: "start",
                              loop: true,
                            }}
                            className="self-center"
                          >
                            <CarouselContent>
                              {room.gallery_images.map((img, index) => (
                                <CarouselItem key={index} className="">
                                  <img
                                    className=" object-cover w-full h-[60vw] md:object-cover md:w-full md:h-[460px] lg:h-[400px]"
                                    src={img}
                                  />
                                </CarouselItem>
                              ))}
                            </CarouselContent>
                            <CarouselPrevious
                              className={cn(
                                "-left-[-20px] bg-non text-white w-[40px] h-[40px] border-2"
                              )}
                            />
                            <CarouselNext
                              className={cn(
                                "-right-[-20px] bg-non text-white w-[40px] h-[40px] border-2"
                              )}
                            />
                          </Carousel>
                          <div className="w-full text-gray-700 flex gap-4">
                            <span>{room.room_capacity} Guests</span>
                            <span className="text-gray-500">|</span>
                            <span>{room.bed_type}</span>
                            <span className="text-gray-500">|</span>
                            <span>{room.room_size}</span>
                          </div>
                          <p className="w-full text-gray-700">
                            {room.room_description}
                          </p>
                          <div>
                            <h3>Room Amenities</h3>
                            <ul className="relative left-8 top-2 list-disc list-outside text-gray-700 md:columns-2">
                              {room.amenities.map((amenity, index) => {
                                return <li>{amenity}</li>;
                              })}
                            </ul>
                          </div>
                        </div>
                      </ScrollArea>
                    </DialogContent>
                  </Dialog>

                  <Dialog open={isRoomImgOpen} onOpenChange={setIsRoomImgOpen}>
                    <DialogContent className="sm:max-w-[170vw]  h-full">
                      <div className="flex justify-center items-center bg-black overflow-hidden">
                        <DialogClose className="h-0 absolute top-0 right-0">
                          <X className="text-white m-4" />
                        </DialogClose>
                        <Carousel
                          opts={{
                            align: "start",
                            loop: true,
                          }}
                          className=""
                        >
                          <CarouselContent className="lg:w-[180vw] flex items-center lg:justify-between ">
                            {room.gallery_images.map((img, index) => (
                              <CarouselItem
                                key={index}
                                className="lg:basis-1/3 lg:p-4"
                              >
                                <img
                                  className="  w-full h-auto lg:h-[80vh] lg:object-cover"
                                  src={img}
                                />
                              </CarouselItem>
                            ))}
                          </CarouselContent>

                          <CarouselPrevious
                            className="-left-[-20px] lg:left-[29.4%] bg-non text-white w-[40px] h-[40px] lg:w-[50px] lg:h-[50px] border-2"
                            arrowStyle="lg:w-8 lg:h-6"
                          />
                          <CarouselNext
                            className="-right-[-20px] lg:right-[30%] bg-non text-white w-[40px] h-[40px] lg:w-[50px] lg:h-[50px] border-2"
                            arrowStyle="lg:w-8 lg:h-6"
                          />
                        </Carousel>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            );
          })}
        </div>
        <FooterComponent />
      </div>
    </>
  ) : (
    <h1> Loading...</h1>
  );
}
