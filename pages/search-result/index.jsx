"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
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

import useVacantRoom from "@/hooks/use-vacant-room";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useBookingContext } from "@/contexts/booking";
import SearchResultLoading from "@/components/search-component/SearchResultLoading";
import format from "date-fns/format";
import LoadingButton from "@/components/loading-button/loading-button";

export default function Search_result() {
  const [openRoomDetail, setOpenRoomDetail] = useState({});
  const [openRoomImg, setOpenRoomImg] = useState({});
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();
  const { searchData, createBooking } = useBookingContext();
  const [user, setUser] = useState({});
  const [loadingStates, setLoadingStates] = useState({});

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

  // create booking
  const handleBookNow = async (index) => {
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
        discount_price: 0,
        status: "Booking Initiated",
      };
      await createBooking(data);
    } else {
      router.push("/login");
    }
  };

  const handleButtonClick = async (index) => {
    setLoadingStates((prev) => ({ ...prev, [index]: true }));
    try {
      await handleBookNow(index);
    } finally {
      setLoadingStates((prev) => ({ ...prev, [index]: false }));
    }
  };

  const RoomIsFullyBooked = () => {
    return (
      <div className="w-full h-[70vh] flex flex-col justify-center items-center gap-5">
        <p className="text-2xl font-extrabold text-center"> 
          Unfortunately, the room you’re looking for is not available for your request. <br />{" "}
          Please try different dates.
        </p>
      </div>
    );
  };

  return (
    <section className="flex flex-col items-center font-body">
      <div className=" w-full flex justify-center items-center bg-white rounded shadow-lg md:h-[120px] md:sticky md:top-0 md:z-10 ">
        <SearchBox />
      </div>
      {/* room search result */}
      <div className="w-full mb-12 flex flex-col items-center md:mt-12 md:mb-28 md:z-0">
        {isLoading || roomData === null ? (
          <SearchResultLoading />
        ) : !roomData[0] ? (
          <RoomIsFullyBooked />
        ) : (
          roomData &&
          roomData.map((room, index) => {
            return (
              <div
                key={index}
                className="mt-6 py-4 md:py-8 border-b border-gray-300 flex flex-col justify-center w-full md:max-w-[1440px] md:h-[]  md:flex-row md:justify-between md:items-center md:mt-0"
              >
                <div className="relative basis-[40%] pl-0 min-[767px]:pl-4 min-[1472px]:p-0 h-[200px]  md:h-[300px] xl:h-[400px]">
                  <Image
                    src={room.main_image ? room.main_image : { vector }}
                    onClick={() => handlePopUpRoomImage(index)}
                    alt="room image"
                    width={450}
                    height={320}
                    className="relative w-full h-full max-h-[300px] min-[400px]:max-h-[470px] md:max-h-full md:h-full xl:max-h-[470px]  xl:w-[100%] xl:h-[100%] bg-center bg-cover md:rounded-md bg-gray-300 object-cover object-center hover:cursor-pointer"
                  />

                  <svg
                    onClick={() => handlePopUpRoomImage(index)}
                    width="60"
                    height="60"
                    viewBox="0 0 40 40"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="absolute size-[3rem] bottom-0 left-0 min-[767px]:left-4 min-[1472px]:left-0  bg-white p-2 rounded-md opacity-75 hover:opacity-90 hover:cursor-pointer"
                  >
                    <g opacity="0.6">
                      <path
                        d="M0 0H36C38.2091 0 40 1.79086 40 4V40H0V0Z"
                        fill="white"
                      />
                      <path
                        d="M10.25 23.75L15.409 18.591C15.6179 18.3821 15.866 18.2163 16.139 18.1033C16.4119 17.9902 16.7045 17.932 17 17.932C17.2955 17.932 17.5881 17.9902 17.861 18.1033C18.134 18.2163 18.3821 18.3821 18.591 18.591L23.75 23.75M22.25 22.25L23.659 20.841C23.8679 20.6321 24.116 20.4663 24.389 20.3533C24.6619 20.2402 24.9545 20.182 25.25 20.182C25.5455 20.182 25.8381 20.2402 26.111 20.3533C26.384 20.4663 26.6321 20.6321 26.841 20.841L29.75 23.75M11.75 27.5H28.25C28.6478 27.5 29.0294 27.342 29.3107 27.0607C29.592 26.7794 29.75 26.3978 29.75 26V14C29.75 13.6022 29.592 13.2206 29.3107 12.9393C29.0294 12.658 28.6478 12.5 28.25 12.5H11.75C11.3522 12.5 10.9706 12.658 10.6893 12.9393C10.408 13.2206 10.25 13.6022 10.25 14V26C10.25 26.3978 10.408 26.7794 10.6893 27.0607C10.9706 27.342 11.3522 27.5 11.75 27.5ZM22.25 16.25H22.258V16.258H22.25V16.25ZM22.625 16.25C22.625 16.3495 22.5855 16.4448 22.5152 16.5152C22.4448 16.5855 22.3495 16.625 22.25 16.625C22.1505 16.625 22.0552 16.5855 21.9848 16.5152C21.9145 16.4448 21.875 16.3495 21.875 16.25C21.875 16.1505 21.9145 16.0552 21.9848 15.9848C22.0552 15.9145 22.1505 15.875 22.25 15.875C22.3495 15.875 22.4448 15.9145 22.5152 15.9848C22.5855 16.0552 22.625 16.1505 22.625 16.25V16.25Z"
                        stroke="#646D89"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </g>
                  </svg>
                </div>

                <div className="p-4  flex flex-col basis-[60%] md:h-[300px] xl:h-[400px] md:justify-between md:pl-8 xl:pl-16">
                  <div className="md:flex justify-between">
                    <div className="md:w-[60%]">
                      <h1 className="w-full text-[1.5rem] xl:text-[2rem] font-semibold">
                        {room.type_name}
                      </h1>
                      <div className="w-full text-gray-700 flex gap-4 my-4 text-[1rem] xl:text-[1.3rem]">
                        <span className="text-center">
                          {room.room_capacity} Guests
                        </span>
                        <span className="border-x border-gray-500 mx-2 px-2 text-center">
                          {room.bed_type}
                        </span>
                        <span className="text-center">
                          {room.room_size} sqm
                        </span>
                      </div>
                      <p className="w-full text-gray-700 mb-4 text-[1rem] xl:text-[1.3rem]">
                        {room.room_description}
                      </p>
                    </div>
                    <div className="text-right my-0 md:w-[40%]">
                      <div>
                        {room.promotion_price ? (
                          <div>
                            <p className="line-through text-gray-700 xl:text-[1.3rem]">
                              THB{" "}
                              {Number(room.current_price).toLocaleString(
                                "en-US",
                                {
                                  minimumFractionDigits: 2,
                                  maximumFractionDigits: 2,
                                }
                              )}
                            </p>
                            <p className="text-xl font-semibold xl:text-[1.5rem]">
                              THB{" "}
                              {Number(room.promotion_price).toLocaleString(
                                "en-US",
                                {
                                  minimumFractionDigits: 2,
                                  maximumFractionDigits: 2,
                                }
                              )}
                            </p>
                          </div>
                        ) : (
                          <p className="text-xl font-semibold xl:text-[1.5rem]">
                            THB{" "}
                            {Number(room.current_price).toLocaleString(
                              "en-US",
                              {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                              }
                            )}
                          </p>
                        )}
                      </div>
                      <div className="my-4 xl:text-[1.3rem]">
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
                      onClick={() => handlePopUpRoomDetail(index)}
                      className="w-40 text-orange-500 hover:text-orange-400 hover:bg-white"
                    >
                      Room Detail
                    </Button>
                    <Button
                      onClick={() => handleButtonClick(index)}
                      disabled={loadingStates[index]}
                    >
                      {loadingStates[index] ? (
                        <div>
                          <div
                            className="inline-block h-4 w-4 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
                            role="status"
                          ></div>
                          <span className="ml-2">Processing...</span>
                        </div>
                      ) : (
                        <span className="ml-2">Book Now</span>
                      )}
                    </Button>
                  </div>

                  <Dialog
                    open={openRoomDetail[index] || false}
                    onOpenChange={() => handlePopUpRoomDetail(index)}
                  >
                    <DialogContent className="h-[80vh] max-h-[900px] w-full md:max-w-[90vw] lg:max-w-[1000px] min-[2500px]:max-w-[40vw] flex flex-col items-start">
                      <DialogHeader className="w-full h-[60px] px-4 md:px-20 border-b flex flex-row items-center ">
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
                              {room.gallery_images
                                ? room.gallery_images.map((img, index) => (
                                    <CarouselItem
                                      className="w-full h- md:object-cover   bg-center bg-cover"
                                      key={index}
                                    >
                                      <Image
                                        className=" object-cover w-full h-[60vw] md:object-cover md:w-full md:h-[500px]"
                                        src={img}
                                        width={450}
                                        height={360}
                                        alt={room.type_name}
                                      />
                                    </CarouselItem>
                                  ))
                                : ""}
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
                          <div className="w-full text-gray-700 flex gap-4 mt-4">
                            <span>{room.room_capacity} Guests</span>
                            <span className="text-gray-500">|</span>
                            <span>{room.bed_type}</span>
                            <span className="text-gray-500">|</span>
                            <span>{room.room_size} sqm</span>
                          </div>
                          <div className=" pb-8 border-b">
                            <p className="w-full text-gray-700 ">
                              {room.room_description}
                            </p>
                          </div>

                          <div>
                            <h3>Room Amenities</h3>
                            <ul className="relative left-8 top-2 list-disc list-outside text-gray-700 md:columns-2">
                              {room.amenities
                                ? room.amenities.map((amenity, index) => {
                                    return <li key={index}>{amenity}</li>;
                                  })
                                : ""}
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
                    <DialogContent className="sm:max-w-[170vw] h-full overflow-hidden">
                      <div className="flex justify-center items-center bg-black overflow-hidden">
                        <DialogClose className="h-0 absolute top-0 right-0 z-10">
                          <X className="text-white m-4" />
                        </DialogClose>
                        <Carousel
                          opts={{
                            align: "start",
                            loop: true,
                          }}
                        >
                          <CarouselContent className="lg:w-[180vw] flex items-center lg:justify-between ">
                            {room.gallery_images
                              ? room.gallery_images.map((img, index) => (
                                  <CarouselItem
                                    key={index}
                                    className="lg:basis-1/3 lg:p-4"
                                  >
                                    <Image
                                      className="w-full h-[60vw] object-cover md:h-[60vw] xl:h-[70vh] lg:object-cover"
                                      src={img}
                                      width={450}
                                      height={320}
                                      alt={room.type_name}
                                    />
                                  </CarouselItem>
                                ))
                              : ""}
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
          })
        )}
      </div>

      <FooterComponent />
    </section>
  );
}
