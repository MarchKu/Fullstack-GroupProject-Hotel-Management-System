import React from "react";
import { Skeleton } from "../../ui/skeleton";

const LoadingBookingStep4 = () => {
  return (
    <div class="w-full pb-8 md:px-[5%] lg:px-[10%] md:pb-32">
      <div className="w-full  flex flex-col items-center gap-8 md:mt-8  md:w-[100%] md:p-8 bg-white">
        <div className="max-w-[738px] h-full min-h-[428px] rounded bg-green-700 text-white">
          <div className="w-full   py-8 px-4 md:px-32   rounded bg-green-800">
            <h1 className="text-5xl text-center font-heading font-normal mb-8">
              Thank you for booking
            </h1>
            <p className="text-center ">
              We are looking forward to hosting you at our place. We will send
              you more information about check-in and staying at our Neatly
              closer to your date of reservation
            </p>
          </div>
          <div className="w-full min-h-[366px] px-4 md:px-10 pt-5 flex flex-col">
            <div className="flex flex-col gap-4 md:flex-row md:justify-between  mb-8 rounded-sm bg-green-600 p-6">
              <div className="w-full h-full flex flex-col gap-2">
                <div className="w-full h-full flex gap-2">
                  <Skeleton className="w-full h-[1.3rem]"></Skeleton>
                  <Skeleton className="w-full h-[1.3rem]"></Skeleton>
                </div>
                <Skeleton className="w-[100px] h-[1.3rem]"></Skeleton>
              </div>

              <div className="flex flex-col w-full h-full gap-2">
                <div className="flex flex-col items-end">
                  <Skeleton className="w-[35%] h-[1.3rem]"></Skeleton>
                  <Skeleton className="w-[30%] h-[1.3rem]"></Skeleton>
                </div>
                <div className="flex flex-col items-end">
                  <Skeleton className="w-[35%] h-[1.3rem]"></Skeleton>
                  <Skeleton className="w-[30%] h-[1.3rem]"></Skeleton>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <div className="flex justify-between mb-4">
                <Skeleton className="w-[35%] h-[1.3rem]"></Skeleton>
                <Skeleton className="w-[30%] h-[1.3rem]"></Skeleton>
              </div>
              <div className="flex justify-between mb-4">
                <Skeleton className="w-[35%] h-[1.3rem]"></Skeleton>
                <Skeleton className="w-[20%] h-[1.3rem]"></Skeleton>
              </div>
              <div className="flex justify-between mb-4">
                <Skeleton className="w-[30%] h-[1.3rem]"></Skeleton>
                <Skeleton className="w-[30%] h-[1.3rem]"></Skeleton>
              </div>
            </div>
            <div className="flex justify-between border-t border-gray-100 h-[75px] items-center">
              <Skeleton className="w-[30%] h-[2rem]"></Skeleton>
              <Skeleton className="w-[40%] h-[2rem]"></Skeleton>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4 md:flex-row">
          <button className="w-[320px] md:w-[200px] text-orange-500 order-2 md:order-1">
            Check Booking Detail
          </button>
          <Skeleton className="w-[320px] md:w-[200px] order-1 md:order-2">
            Back to Home
          </Skeleton>
        </div>
      </div>
    </div>
  );
};

export default LoadingBookingStep4;
