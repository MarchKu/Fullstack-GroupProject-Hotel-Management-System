import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const Loading = () => {
  return (
    <section className="w-full min-h-[1000px] h-[200vh] md:h-[150vh] md:min-h-[1600px] py-[5%] flex flex-col justify-start items-center overflow-hidden">
      <div className="w-screen md:w-full h-[30%] md:h-[40%] flex gap-[1.5rem]">
        <Skeleton className="w-full md:w-1/3 h-full"></Skeleton>
        <Skeleton className="hidden md:block md:w-1/3 h-full"></Skeleton>
        <Skeleton className="hidden md:block md:w-1/3 h-full"></Skeleton>
      </div>
      <div className="w-full h-[70%] md:h-[60%] pt-[5%] px-[5%] md:px-[15%] flex flex-col gap-[2.5%] md:gap-[5%]">
        <Skeleton className="w-full h-[10%] md:h-[4rem] lg:[6rem] h-start"></Skeleton>
        <div className="w-full h-[30%] flex flex-col md:flex-row items-center justify-between">
          <div className="w-full md:w-[50%] h-full flex flex-col justify-between font-body  gap-[1.5rem] md:gap-[2rem]">
            <Skeleton className="h-[40%] w-[50%]"></Skeleton>
            <Skeleton className="h-[20%] w-full"></Skeleton>
            <Skeleton className="h-[20%] w-full"></Skeleton>
          </div>
          <div className="w-full md:w-[50%] h-full flex md:flex-col justify-between items-end font-body pt-[1.5rem]">
            <div>
              <Skeleton className="md:h-[1.25rem] h start md:h-end "></Skeleton>
              <Skeleton className="h-[1.25rem] md:h-[1.5rem]  font-bold"></Skeleton>
            </div>
            <Skeleton className="w-[60%] h-[4rem] font-body"></Skeleton>
            <Skeleton className="w-[180px] h-[4rem] font-body"></Skeleton>
          </div>
        </div>
        <hr />
        <div className="w-full h-[60%] flex flex-col gap-[1.5rem]">
          <Skeleton className="w-full flex flex-col md:flex-row md:flex-wrap h-[3rem] lg:h-[5rem] font-body pt-8 "></Skeleton>
          <Skeleton className="w-full flex flex-col md:flex-row md:flex-wrap h-[3rem] lg:h-[5rem] font-body pt-8 "></Skeleton>
          <Skeleton className="w-full flex flex-col md:flex-row md:flex-wrap h-[3rem] lg:h-[5rem] font-body pt-8 "></Skeleton>
          <Skeleton className="w-full flex flex-col md:flex-row md:flex-wrap h-[3rem] lg:h-[5rem] font-body pt-8 "></Skeleton>
          <Skeleton className="w-full flex flex-col md:flex-row md:flex-wrap h-[3rem] lg:h-[5rem] font-body pt-8 "></Skeleton>
        </div>
      </div>
    </section>
  );
};

export default Loading;
