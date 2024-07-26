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
    console.log("user:", user);
    console.log("user:", user.fullName);
  }, [user]);

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
        console.log(roomData);
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

  return roomData ? (
    <section className="w-full min-h-[1000px] h-[200vh] md:h-[150vh] md:min-h-[1600px] py-[5%] flex flex-col justify-start items-center overflow-hidden">
      <div className="w-full h-[30%] md:h-[40%] ">
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-screen h-full"
        >
          <CarouselContent className="w-full h-full ">
            {roomData.gallery_images.map((img, index) => (
              <CarouselItem key={index}>
                <Card className="w-screen md:w-full h-full">
                  <CardContent className="w-full h-full flex items-center justify-center p-0">
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
      <div className="w-full h-[70%] md:h-[60%] pt-[5%] px-[5%] md:px-[15%] flex flex-col gap-[2.5%] md:gap-[5%]">
        <h2 className="w-full h-[10%] text-[3rem] md:text-[4rem] xl:text-[6rem] text-start content-center font-heading text-primary-heading">
          {roomData.type_name}
        </h2>
        {/* Need to render */}
        <div className="w-full h-[30%] flex flex-col md:flex-row items-center justify-between">
          <div className="w-full md:w-[50%] h-full flex flex-col justify-between font-body md:text-[1.25rem] xl:text-[1.5rem] gap-[1.5rem] md:gap-[2rem]">
            <p className="h-[80%] text-secondary-body">
              {/* render data */}
              {roomData.room_description}
            </p>
            <p className="h-[20%] text-secondary-body">
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
          <div className="w-full md:w-[50%] h-full flex md:flex-col justify-between items-end font-body pt-[1.5rem]">
            <div>
              <p className="md:text-[1.25rem] text start md:text-end text-secondary-body xl:text-[1.5rem]">
                <s>
                  {/* render data */}
                  THB {roomData.current_price}
                </s>
              </p>
              <p className="text-[1.25rem] md:text-[1.5rem] xl:text-[1.7rem]  font-bold">
                {/* render data */}
                THB {roomData.promotion_price}
              </p>
            </div>

            {isAuthenticated ? (
              <Button
                className="w-40 xl:w-[180px] rounded xl:text-[1.5rem]"
                onClick={() => router.push("/booking")}
              >
                Book Now
              </Button>
            ) : (
              <Button
                className="w-40 xl:w-[180px] rounded xl:text-[1.25rem]"
                onClick={() => router.push("/login")}
              >
                Book Now
              </Button>
            )}
          </div>
        </div>
        <hr />
        <div className="w-full h-[60%]">
          <h3 className="font-body font-bold text-[1.5rem]">Room Amenities</h3>
          <div className="w-full flex flex-col md:flex-row md:flex-wrap text-[1rem] lg:text-[1.25rem] xl:text-[1.5rem] font-body pt-8 text-secondary-body">
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
