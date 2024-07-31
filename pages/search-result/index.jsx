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

export default function Search_result() {
  const [isRoomdetailOpen, setIsRoomDetailOpen] = useState(false);
  const [isRoomImgOpen, setIsRoomImgOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [bookingData, setBookingData] = useState();

  const router = useRouter();

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

  //pop-up
  const handlePopUpRoomDetail = () => {
    setIsRoomDetailOpen(true);
  };

  const handlePopUpRoomImage = () => {
    setIsRoomImgOpen(true);
  };

  // get room data
  const date = { ...router.query };
  const { roomData, getRoomDeta, isLoading, isError } = useVacantRoom();
  const getVacantRoom = (date) => {
    getRoomDeta(date);
  };

  // get bookingData from localStorage
  const getBookingData = () => {
    const getData = localStorage.getItem("bookingData");
    if (getData) {
      setBookingData(JSON.parse(getData));
    }
  };

  useEffect(() => {
    getBookingData();
    getVacantRoom(date);
  }, []);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }
  if (isError) {
    return <h1>Error fetching data</h1>;
  }

  const handleBookNow = (index) => {
    let roomPrice;
    if (roomData[index].promotion_price) {
      roomPrice = roomData[index].promotion_price;
    } else {
      roomPrice = roomData[index].current_price;
    }
    const newBookingData = {
      ...bookingData,
      room_id: roomData[index].room_id,
      room_type: roomData[index].type_name,
      room_price: roomPrice,
      user_id: user.userId,
      user_name: user.username,
    };
    const query = { username: `${user.username}` };
    if (isAuthenticated) {
      localStorage.setItem("bookingData", JSON.stringify(newBookingData));
      router.push({ pathname: "/booking", query: query });
    } else {
      router.push("/login");
    }
  };

  const handleOnDateChange = () => {
    getVacantRoom(date);
    getBookingData();
  };

  const handleClick = () => {
    getVacantRoom(date);
  };

  return roomData ? (
    <section className="w-full overflow-hidden">
      <NavbarComponent isAuthenticated={isAuthenticated} />
      <div className=" w-full h-[400px] flex border-1 border-gray-200 px-[2.5%] py-[10%] md:py-0 xl:px-[10%] md:pb-[2rem]  rounded shadow-xl shadow-gray-200 bg-white justify-center items-center md:h-[150px] md:sticky md:top-0 md:z-10">
        <SearchBox onDateChage={handleOnDateChange} />
      </div>
      <div className="w-full px-[5%] xl:px-[10%] flex flex-col justify-center items-center font-body">
        {/* room search result */}
        <div className="w-full flex flex-col items-center py-[5%] md:z-0">
          <button onClick={handleClick}>Test</button>
          {roomData.map((room, index) => {
            return (
              <div
                key={index}
                className="border-b min-h-[700px] md:min-h-[500px] xl:min-h-[650px] py-[5%] border-gray-300 flex flex-col justify-center items-center w-full h-[90vh] md:h-[450px] md:flex-row md:justify-between md:items-center md:py-[2rem]"
              >
                <div
                  className="relative w-screen h-[45%] md:w-[45%] xl:w-[40%] md:size-full bg-center bg-cover md:rounded-lg "
                  style={{
                    backgroundImage: `url( ${
                      room.gallery_images ? room.gallery_images[0] : { vector }
                    })`,
                  }}
                >
                  <Image
                    src={vector}
                    className="absolute size-[3rem] bottom-0 left-0 bg-white p-2 rounded-md opacity-75 hover:opacity-90 hover:cursor-pointer"
                    onClick={handlePopUpRoomImage}
                  />
                </div>
                <div className="h-[55%] md:h-full md:w-[45%] xl:w-[50%]">
                  <div className="py-[5%] size-full flex flex-col md:w-full md:h-full md:justify-between ">
                    <div className="md:flex">
                      <div className="w-full md:w-[50%] flex flex-col gap-[1.5rem]">
                        <h1 className="w-full text-[28px] md:text-[1.25rem] xl:text-[2rem] font-semibold">
                          {room.type_name}
                        </h1>
                        <div className="w-full text-gray-700 flex md:text-[0.7rem] xl:text-[1.5rem]">
                          <span className="text-center">
                            {room.room_capacity} Guests
                          </span>
                          <span className="border-x border-gray-500 mx-2 px-2 text-center">
                            {room.bed_type}
                          </span>
                          <span className="text-center">{room.room_size}</span>
                        </div>
                        <p className="w-full text-gray-700 mb-4 xl:text-[1.5rem]">
                          {room.room_description}
                        </p>
                      </div>
                      <div className="w-full md:w-[50%] text-right my-0">
                        <div>
                          {room.promotion_price ? (
                            <div>
                              <p className="line-through text-gray-700 xl:text-[1.25rem] ">
                                THB {room.current_price}
                              </p>
                              <p className="text-xl font-semibold xl:text-[1.5rem]">
                                THB {room.promotion_price}
                              </p>
                            </div>
                          ) : (
                            <p className="text-xl font-semibold xl:text-[1.5rem]">
                              THB {room.current_price}
                            </p>
                          )}
                        </div>
                        <div className="my-4">
                          <p className="text-gray-700 xl:text-[1.25rem]">
                            Per Night
                          </p>
                          <p className="text-gray-700 xl:text-[1.25rem]">
                            (Including Taxes & Fees)
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="w-[90%] flex flex-row  justify-end self-end ">
                      <Button
                        variant="ghost"
                        onClick={handlePopUpRoomDetail}
                        className="w-40 text-orange-500 hover:text-orange-400 hover:bg-white xl:text-[1.25rem]"
                      >
                        Room Detail
                      </Button>

                      <Button
                        className="w-40 xl:w-[180px] rounded xl:text-[1.25rem]"
                        onClick={() => handleBookNow(index)}
                      >
                        Book Now
                      </Button>
                    </div>
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
                              {room.gallery_images ? (
                                room.gallery_images.map((img, index) => (
                                  <CarouselItem key={index} className="">
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
                            <span>{room.room_size}</span>
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

                  <Dialog open={isRoomImgOpen} onOpenChange={setIsRoomImgOpen}>
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
                          <CarouselContent className="w-screen h-[60vh] flex items-center lg:justify-between ">
                            {room.gallery_images ? (
                              room.gallery_images.map((img, index) => (
                                <CarouselItem
                                  key={index}
                                  className="size-full bg-center bg-cover bg-slate-300 bg-blend-multiply mx-[0.5rem]"
                                  style={{ backgroundImage: `url(${img})` }}
                                ></CarouselItem>
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
      </div>
    </section>
  ) : (
    <h1> Loading...</h1>
  );
}
