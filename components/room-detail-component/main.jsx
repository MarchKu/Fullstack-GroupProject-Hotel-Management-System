"use client";
import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel-about";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import useRoomData from "@/hooks/use-room-data";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Loading from "./loading";

const RoomDetail = () => {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
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

  const { id } = router.query;

  const { roomData, getRoomDetailByID, isLoading, isError } = useRoomData();
  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        await getRoomDetailByID(id);
      }
    };
    fetchData();
  }, [id]);

  if (isLoading || id === null || id === undefined) {
    return <Loading />;
  }
  if (isError) {
    return <h1>Error fetching data</h1>;
  }
  const handleClick = () => {
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    const checkIn = new Date(new Date().setDate(new Date().getDate() + 1));
    const checkInParams = `${daysOfWeek[checkIn.getDay()]}%2C+${String(
      checkIn.getDate()
    ).padStart(2, "0")}+${months[checkIn.getMonth()]}+${checkIn.getFullYear()}`;

    const checkOut = new Date(new Date().setDate(new Date().getDate() + 2));
    const checkOutParams = `${daysOfWeek[checkOut.getDay()]}%2C+${String(
      checkOut.getDate()
    ).padStart(2, "0")}+${
      months[checkOut.getMonth()]
    }+${checkOut.getFullYear()}`;

    router.push(
      `/search-result?check_in=${checkInParams}&check_out=${checkOutParams}&number_of_night=1&guests=2`
    );
  };

  return roomData ? (
    <section className="w-full h-auto md:min-h-screen pt-[2.5%] pb-[5%] px-[5%] flex flex-col justify-start items-center overflow-hidden">
      <div className="w-screen h-[400px] md:h-[50vh] max-w-[1440px]">
        <Carousel
          opts={{
            align: "center",
            loop: true,
          }}
          className="w-full h-full"
        >
          <CarouselContent className="w-full h-full">
            {roomData.gallery_images.map((img, index) => (
              <CarouselItem key={index}>
                <Card className="w-screen md:w-full h-full">
                  <CardContent className="w-full h-full flex items-center justify-center p-0">
                    <div
                      className="size-full bg-center bg-cover bg-slate-300"
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
      <div className="w-full max-w-[1440px] h-auto md:h-[60%] pt-[5%] xl:pt-[2.5%] px-[5%] xl:px-0 flex flex-col gap-[2.5%] md:gap-[5%]">
        <h2 className="w-full h-auto text-[2.5rem] md:text-[4rem] xl:text-[5rem] text-start content-center font-heading text-primary-heading">
          {roomData.type_name}
        </h2>
        {/* Need to render */}
        <div className="w-full h-auto flex flex-col md:flex-row items-center justify-between py-[1.5rem]">
          <div className="w-full md:w-[50%] h-full flex flex-col justify-between font-body md:gap-[2rem]">
            <p className="h-auto text-secondary-body text-[0.8rem] lg:text-[1rem] ">
              {/* render data */}
              {roomData.room_description}
            </p>
            <p className="h-auto text-secondary-body text-[0.8rem] lg:text-[1rem] ">
              <span className="pr-2 md:pr-6">
                {" "}
                {roomData.room_capacity} Person
              </span>
              <span className="px-2 md:px-6 border-l-[1px] border-gray-500 ">
                {/* render data */}
                {roomData.bed_type}
              </span>
              <span className="pl-2 md:pl-6 border-l-[1px] border-gray-500">
                {/* render data */}
                {roomData.room_size}
              </span>
            </p>
          </div>
          <div className="w-full md:w-[50%] h-full flex md:flex-col justify-between items-end font-body">
            <div>
              {roomData.promotion_price ? (
                <>
                  <p className="text-start md:text-end text-secondary-body text-[0.8rem] md:text-[1.25rem] font-semibold">
                    THB{" "}
                    {roomData.current_price.replace(
                      /\B(?=(\d{3})+(?!\d))/g,
                      ","
                    )}
                  </p>
                  <p className="text-[1.25rem] md:text-[1.5rem] xl:text-[1.7rem]  font-semibold">
                    THB{" "}
                    {roomData.promotion_price &&
                      roomData.promotion_price.replace(
                        /\B(?=(\d{3})+(?!\d))/g,
                        ","
                      )}
                  </p>
                </>
              ) : (
                <p className="text-[1.25rem] md:text-[1.5rem] xl:text-[1.7rem]  font-semibold">
                  THB{" "}
                  {roomData.current_price &&
                    roomData.current_price.replace(
                      /\B(?=(\d{3})+(?!\d))/g,
                      ","
                    )}
                </p>
              )}
            </div>

            {isAuthenticated ? (
              <Button
                className="size-auto xl:text-[1.5rem] mt-[1rem]"
                onClick={() => handleClick()}
              >
                Book Now
              </Button>
            ) : (
              <Button
                className="size-auto xl:text-[1.5rem] mt-[1rem]"
                onClick={() => router.push("/login")}
              >
                Book Now
              </Button>
            )}
          </div>
        </div>
        <hr />
        <div className="w-full h-auto">
          <h3 className="font-body font-bold text-[1.5rem] pt-[1.5rem]">
            Room Amenities
          </h3>
          <div className="w-full flex flex-col md:flex-row md:flex-wrap text-[0.8rem] lg:text-[1rem] font-body pt-[1rem] text-secondary-body">
            {/* render data */}
            {roomData.amenities === null ? (
              <div></div>
            ) : (
              roomData.amenities.map((info, index) => {
                return (
                  <li className="w-full md:w-[50%]" key={index}>
                    {info}
                  </li>
                );
              })
            )}
          </div>
        </div>
      </div>
    </section>
  ) : (
    <Loading />
  );
};

export default RoomDetail;
