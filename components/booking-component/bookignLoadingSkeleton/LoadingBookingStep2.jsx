import React from "react";
import { Skeleton } from "../../ui/skeleton";

const LoadingBookingStep2 = () => {
  return (
    <div className="w-full p-4 lg:px-8 xl:px-28 pb-8 md:pb-32">
      <div className="w-full relative">
        <div className="w-full p-4 flex flex-col gap-8 md:mt-8  md:w-[50%] lg:w-[60%] xl:w-[60%] md:p-8 md:border  bg-white">
          <div className="flex flex-col">
            <div className="mb-8 flex flex-col gap-4">
              <Skeleton className="w-[250px] h-[2rem]"></Skeleton>
              <Skeleton className="w-[300px] h-[1.3rem]"></Skeleton>
            </div>
            <div className="flex flex-col gap-6 mb-8">
              <div className="flex gap-4">
                <Skeleton className="w-[1.5rem] h-[1.5rem]"></Skeleton>
                <Skeleton className="w-[300px] h-[1.3rem]"></Skeleton>
              </div>
              <div className="flex gap-4">
                <Skeleton className="w-[1.5rem] h-[1.5rem]"></Skeleton>
                <Skeleton className="w-[300px] h-[1.3rem]"></Skeleton>
              </div>
              <div className="flex gap-4">
                <Skeleton className="w-[1.5rem] h-[1.5rem]"></Skeleton>
                <Skeleton className="w-[300px] h-[1.3rem]"></Skeleton>
              </div>
              <div className="flex gap-4">
                <Skeleton className="w-[1.5rem] h-[1.5rem]"></Skeleton>
                <Skeleton className="w-[300px] h-[1.3rem]"></Skeleton>
              </div>
              <div className="flex gap-4">
                <Skeleton className="w-[1.5rem] h-[1.5rem]"></Skeleton>
                <Skeleton className="w-[300px] h-[1.3rem]"></Skeleton>
              </div>
            </div>
            <div className="mb-8 flex flex-col gap-4">
              <Skeleton className="w-[250px] h-[2rem]"></Skeleton>
              <Skeleton className="w-[300px] h-[1.3rem]"></Skeleton>
            </div>
            <div className="flex flex-col gap-6 mb-8">
              <div className="flex gap-4">
                <Skeleton className="w-[1.5rem] h-[1.5rem]"></Skeleton>
                <Skeleton className="w-[300px] h-[1.3rem]"></Skeleton>
              </div>
              <div className="flex gap-4">
                <Skeleton className="w-[1.5rem] h-[1.5rem]"></Skeleton>
                <Skeleton className="w-[300px] h-[1.3rem]"></Skeleton>
              </div>
              <div className="flex gap-4">
                <Skeleton className="w-[1.5rem] h-[1.5rem]"></Skeleton>
                <Skeleton className="w-[300px] h-[1.3rem]"></Skeleton>
              </div>
              <div className="flex gap-4">
                <Skeleton className="w-[1.5rem] h-[1.5rem]"></Skeleton>
                <Skeleton className="w-[300px] h-[1.3rem]"></Skeleton>
              </div>
              <div className="flex gap-4">
                <Skeleton className="w-[1.5rem] h-[1.5rem]"></Skeleton>
                <Skeleton className="w-[300px] h-[1.3rem]"></Skeleton>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <Skeleton className="w-[140px] h-[1.3rem]"></Skeleton>
              <Skeleton className="w-full h-[4rem]"></Skeleton>
            </div>
          </div>

          <div className=" flex flex-col items-center md:absolute md:right-0 md:top-0">
            <Skeleton className="w-[358px] h-full rounded bg-green-200">
              <div className="w-full h-[62px] p-4  rounded bg-green-300 flex justify-between border border-gray-200">
                <Skeleton className="w-[100px] h-[2rem] flex gap-4"></Skeleton>
                <Skeleton className="w-[56px] h-[25px] rounded bg-orange-200"></Skeleton>
              </div>
              <div className="w-full  px-5 pt-5 flex flex-col">
                <div className="flex justify-between mb-8">
                  <div className="w-[35%] flex flex-col gap-2">
                    <Skeleton className="w-full h-[1.3rem]"></Skeleton>
                    <Skeleton className="w-full h-[1.3rem]"></Skeleton>
                  </div>
                  <div className="w-[35%] flex flex-col gap-2">
                    <Skeleton className="w-full h-[1.3rem]"></Skeleton>
                    <Skeleton className="w-full h-[1.3rem]"></Skeleton>
                  </div>
                </div>
                <div className="mb-8 flex flex-col gap-2">
                  <Skeleton className="w-full h-[1.3rem]"></Skeleton>
                  <Skeleton className="w-full h-[1.3rem]"></Skeleton>
                </div>
                <div className="flex justify-between mb-4">
                  <Skeleton className="w-[40%] h-[1.3rem]"></Skeleton>
                  <Skeleton className="w-[40%] h-[1.3rem]"></Skeleton>
                </div>
                <div>
                  <div className="mb-8">
                    <ul className="flex flex-col gap-4 mb-4">
                      <Skeleton className="w-[40%] h-[1.3rem]"></Skeleton>
                    </ul>
                    <ul className="flex flex-col gap-4">
                      <div className="flex justify-between mb-4">
                        <Skeleton className="w-[40%] h-[1.3rem]"></Skeleton>
                        <Skeleton className="w-[40%] h-[1.3rem]"></Skeleton>
                      </div>
                    </ul>
                  </div>

                  <div className="flex justify-between border-t border-gray-100 h-[75px] items-center">
                    <Skeleton className="w-[30%] h-[2rem]"></Skeleton>
                    <Skeleton className="w-[40%] h-[2rem]"></Skeleton>
                  </div>
                </div>
              </div>
            </Skeleton>
            <div className="w-[358px] h-[124px] pt-5 pb-6 pr-4 pl-10 mt-6 bg-gray-300 text-xs md:mb-8">
              <ul className="list-disc list-outside flex flex-col gap-6 text-green-600">
                <li>
                  Cancel booking will get full refund if the cancelation occurs
                  before 24 hours of the check-in date.
                </li>
                <li>
                  Able to change check-in or check-out date booking within 24
                  hours of the booking date
                </li>
              </ul>
            </div>
          </div>

          <div className="flex justify-between">
            <Skeleton className="w-[100px] h-[2.5rem"></Skeleton>
            <Skeleton className="w-[100px] h-[2.5rem]"></Skeleton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingBookingStep2;
