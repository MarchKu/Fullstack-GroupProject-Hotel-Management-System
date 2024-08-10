"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import vector from "../../assets/search_result/vector.png";
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

import useVacantRoom from "@/hooks/use-vacant-room";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useBookingContext } from "@/contexts/booking";

export default function Search_result() {
  const [openRoomDetail, setOpenRoomDetail] = useState({});
  const [openRoomImg, setOpenRoomImg] = useState({});
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();
  const { searchData, createBooking } = useBookingContext();
  const [user, setUser] = useState({});

  useEffect(() => {
    const fetchUserData = async () => {
      const userData = localStorage.getItem("user");
      if (userData) {
        const parsedData = JSON.parse(userData);
        setUser(parsedData);
      }
    };
    fetchUserData();
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(Boolean(token));
  }, []);

  //pop-up trigger
  const handlePopUpRoomDetail = (index) => {
    setOpenRoomDetail((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  const handlePopUpRoomImage = (index) => {
    setOpenRoomImg((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  // get room data
  const { roomData, getRoomDeta, isLoading, isError } = useVacantRoom();

  const data = router.query;
  useEffect(() => {
    if (data) {
      getRoomDeta(data);
    }
  }, [data]);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }
  if (isError) {
    return <h1>Error fetching data</h1>;
  }

  // create booking
  const handleBookNow = (index) => {
    if (isAuthenticated) {
      let roomPrice;
      if (roomData[index].promotion_price) {
        roomPrice = roomData[index].promotion_price;
      } else {
        roomPrice = roomData[index].current_price;
      }
      const totalPrice = roomPrice * searchData.number_of_night;
      const data = {
        ...searchData,
        room_id: roomData[index].room_id,
        room_type: roomData[index].type_name,
        room_price: roomPrice,
        user_id: user.userId,
        user_name: user.username,
        amount_booking: 1,
        total_price: totalPrice,
        status: "Booking Initiated",
      };
      createBooking(data);
    } else {
      router.push("/login");
    }
  };

  const handleOnDateChange = (Data) => {
    getRoomDeta(Data);
  };

  return roomData ? (
    <section className="flex flex-col items-center font-body">
      <NavbarComponent isAuthenticated={isAuthenticated} />
      <div className=" w-full flex justify-center items-center border-1 border-gray-200  rounded shadow-md shadow-gray-300 bg-white md:h-[150px] md:sticky md:top-0 md:z-10 ">
        <SearchBox onDateChage={handleOnDateChange} />
      </div>
      {/* room search result */}
      <div className="w-full flex flex-col items-center md:mt-12 md:mb-28 md:z-0">
        {roomData.map((room, index) => {
          return (
            <div
              key={index}
              className="mt-12 pb-4 border-b border-gray-300 flex flex-col justify-center md:max-w-[1440px] md:h-[400px] md:flex-row md:justify-between md:items-center md:mt-0 md:pb-0"
            >
              <div className="relative md:w-[450px] md:h-[320px] borde">
                <img
                  src={room.main_image ? room.main_image : { vector }}
                  onClick={() => handlePopUpRoomImage(index)}
                  alt="room image"
                  className="relative w-full h-full md:w-[100%] md:h-[100%] bg-center bg-cover md:rounded-lg bg-gray-300 object-cover object-center hover:cursor-pointer"
                />
                <Image
                  onClick={handlePopUpRoomImage}
                  src={vector}
                  className="absolute size-[3rem] bottom-0 left-0 bg-white p-2 rounded-md opacity-75 hover:opacity-90 hover:cursor-pointer"
                />
              </div>

              <div className="p-4 flex flex-col md:max-w-[620px] md:h-[320px] md:justify-between md:pl-8">
                <div className="md:flex">
                  <div className="basis-[55%]">
                    <h1 className="w-full text-[28px] font-semibold">
                      {room.type_name}
                    </h1>
                    <div className="w-full text-gray-700 flex gap-4 my-4">
                      <span className="text-center">
                        {room.room_capacity} Guests
                      </span>
                      <span className="border-x border-gray-500 mx-2 px-2 text-center">
                        {room.bed_type}
                      </span>
                      <span className="text-center">{room.room_size} sqm</span>
                    </div>
                    <p className="w-full text-gray-700 mb-4">
                      {room.room_description}
                    </p>
                  </div>
                  <div className="basis-[45%] text-right my-0">
                    <div>
                      {room.promotion_price ? (
                        <div>
                          <p className="line-through text-gray-700">
                            THB {room.current_price}
                          </p>
                          <p className="text-xl font-semibold">
                            THB {room.promotion_price}
                          </p>
                        </div>
                      ) : (
                        <p className="text-xl font-semibold">
                          THB {room.current_price}
                        </p>
                      )}
                    </div>
                    <div className="my-4">
                      <p className="text-gray-700">Per Night</p>
                      <p className="text-gray-700">(Including Taxes & Fees)</p>
                    </div>
                  </div>
                </div>
                <div className="w-[90%] flex flex-row  justify-end self-end ">
                  <Button
                    variant="ghost"
                    onClick={() => handlePopUpRoomDetail(index)}
                    className="w-40 text-orange-500 hover:text-orange-400 hover:bg-white"
                  >
                    Room Detail
                  </Button>

                  <Button
                    className="w-40 rounded"
                    onClick={() => handleBookNow(index)}
                  >
                    Book Now
                  </Button>
                </div>

                <Dialog
                  open={openRoomDetail[index] || false}
                  onOpenChange={() => handlePopUpRoomDetail(index)}
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
                          className="self-center w-full"
                        >
                          <CarouselContent>
                            {room.gallery_images ? (
                              room.gallery_images.map((img, index) => (
                                <CarouselItem
                                  className="w-full h-[60vw] md:object-cover md:w-full md:h-[460px] lg:h-[400px] bg-center bg-cover"
                                  key={index}
                                >
                                  <img
                                    className=" object-cover w-full h-[60vw] md:object-cover md:w-full md:h-[460px] lg:h-[400px]"
                                    src={img}
                                    alt={room.type_name}
                                  />
                                </CarouselItem>
                              ))
                            ) : (
                              <p>Loading...</p>
                            )}
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
                          <span>{room.room_size} sqm</span>
                        </div>
                        <p className="w-full text-gray-700">
                          {room.room_description}
                        </p>
                        <div>
                          <h3>Room Amenities</h3>
                          <ul className="relative left-8 top-2 list-disc list-outside text-gray-700 md:columns-2">
                            {room.amenities ? (
                              room.amenities.map((amenity, index) => {
                                return <li key={index}>{amenity}</li>;
                              })
                            ) : (
                              <h>Loading...</h>
                            )}
                          </ul>
                        </div>
                      </div>
                    </ScrollArea>
                  </DialogContent>
                </Dialog>

                <Dialog
                  open={openRoomImg[index] || false}
                  onOpenChange={() => handlePopUpRoomImage(index)}
                >
                  <DialogContent className="sm:max-w-[170vw] h-full">
                    <div className="flex justify-center items-center bg-black overflow-hidden">
                      <DialogClose className="h-0 absolute top-0 right-0 z-10">
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
                          {room.gallery_images ? (
                            room.gallery_images.map((img, index) => (
                              <CarouselItem
                                key={index}
                                className="lg:basis-1/3 lg:p-4"
                              >
                                <img
                                  className="w-full h-[60vw] object-cover md:h-[60vw] xl:h-[80vh] lg:object-cover"
                                  src={img}
                                />
                              </CarouselItem>
                            ))
                          ) : (
                            <p>Loading</p>
                          )}
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
    </section>
  ) : (
    <h1> Loading...</h1>
  );
}
