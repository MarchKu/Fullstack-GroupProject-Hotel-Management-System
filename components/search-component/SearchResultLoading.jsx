import React from "react";
import { Skeleton } from "../ui/skeleton";

const SearchResultLoading = () => {
  return (
    <>
      <div className="mt-6 py-4 md:py-8 border-b border-gray-300 flex flex-col justify-center w-full md:max-w-[1440px] md:flex-row md:justify-between md:items-center md:mt-0 h-full ">
        <div className="md:basis-[40%] pl-0 min-[767px]:pl-4 min-[1472px]:p-0 h-[240px]  md:h-[300px] xl:h-[400px]">
          <Skeleton className="w-full h-full max-h-[300px] min-[400px]:max-h-[470px] md:max-h-full md:h-full xl:max-h-[470px] xl:w-[100%] xl:h-[100%] md:rounded-md"></Skeleton>
        </div>
        <div className="p-4  flex flex-col basis-[60%] md:h-[300px] xl:h-[400px] md:justify-between md:pl-8 xl:pl-16">
          <div className="md:flex justify-between">
            <div className="md:w-[60%]">
              <Skeleton className="w-full h-[1.5rem]  xl:h-[2rem]"></Skeleton>
              <div className="w-full flex gap-4 my-4">
                <Skeleton className="w-full h-[1rem] xl:h-[1.3rem]"></Skeleton>
                <Skeleton className="w-full mx-2 px-2 h-[1rem] xl:h-[1.3rem]"></Skeleton>
                <Skeleton className="w-full h-[1rem] xl:h-[1.3rem]"></Skeleton>
              </div>
              <Skeleton className="w-full text-gray-700 mb-4 h-[1rem] xl:h-[1.3rem]"></Skeleton>
            </div>
            <div className="text-right pl-8 my-0 md:w-[40%]">
              <div>
                <Skeleton className="w-full xl:h-[1.3rem]"></Skeleton>
                <Skeleton className="w-full h-[1.25rem] xl:h-[1.5rem]"></Skeleton>
              </div>

              <div className="my-4 pl-8">
                <Skeleton className="w-full h-[1rem] xl:h-[1.3rem]"></Skeleton>
                <Skeleton className="w-full h-[1rem] xl:h-[1.3rem]"></Skeleton>
              </div>
            </div>
          </div>
          <div className="w-[90%] flex flex-row  justify-end self-end gap-8">
            <Skeleton className="w-40 h-8"></Skeleton>
            <Skeleton className="w-40 h-8 rounded"></Skeleton>
          </div>
        </div>
      </div>
      <div className="mt-6 py-4 md:py-8 border-b border-gray-300 flex flex-col justify-center w-full md:max-w-[1440px] md:flex-row md:justify-between md:items-center md:mt-0 h-full ">
        <div className="md:basis-[40%] pl-0 min-[767px]:pl-4 min-[1472px]:p-0 h-[240px]  md:h-[300px] xl:h-[400px]">
          <Skeleton className="w-full h-full max-h-[300px] min-[400px]:max-h-[470px] md:max-h-full md:h-full xl:max-h-[470px] xl:w-[100%] xl:h-[100%] md:rounded-md"></Skeleton>
        </div>
        <div className="p-4  flex flex-col basis-[60%] md:h-[300px] xl:h-[400px] md:justify-between md:pl-8 xl:pl-16">
          <div className="md:flex justify-between">
            <div className="md:w-[60%]">
              <Skeleton className="w-full h-[1.5rem]  xl:h-[2rem]"></Skeleton>
              <div className="w-full flex gap-4 my-4">
                <Skeleton className="w-full h-[1rem] xl:h-[1.3rem]"></Skeleton>
                <Skeleton className="w-full mx-2 px-2 h-[1rem] xl:h-[1.3rem]"></Skeleton>
                <Skeleton className="w-full h-[1rem] xl:h-[1.3rem]"></Skeleton>
              </div>
              <Skeleton className="w-full text-gray-700 mb-4 h-[1rem] xl:h-[1.3rem]"></Skeleton>
            </div>
            <div className="text-right pl-8 my-0 md:w-[40%]">
              <div>
                <Skeleton className="w-full xl:h-[1.3rem]"></Skeleton>
                <Skeleton className="w-full h-[1.25rem] xl:h-[1.5rem]"></Skeleton>
              </div>

              <div className="my-4 pl-8">
                <Skeleton className="w-full h-[1rem] xl:h-[1.3rem]"></Skeleton>
                <Skeleton className="w-full h-[1rem] xl:h-[1.3rem]"></Skeleton>
              </div>
            </div>
          </div>
          <div className="w-[90%] flex flex-row  justify-end self-end gap-8">
            <Skeleton className="w-40 h-8"></Skeleton>
            <Skeleton className="w-40 h-8 rounded"></Skeleton>
          </div>
        </div>
      </div>
      <div className="mt-6 py-4 md:py-8 border-b border-gray-300 flex flex-col justify-center w-full md:max-w-[1440px] md:flex-row md:justify-between md:items-center md:mt-0 h-full ">
        <div className="md:basis-[40%] pl-0 min-[767px]:pl-4 min-[1472px]:p-0 h-[240px]  md:h-[300px] xl:h-[400px]">
          <Skeleton className="w-full h-full max-h-[300px] min-[400px]:max-h-[470px] md:max-h-full md:h-full xl:max-h-[470px] xl:w-[100%] xl:h-[100%] md:rounded-md"></Skeleton>
        </div>
        <div className="p-4  flex flex-col basis-[60%] md:h-[300px] xl:h-[400px] md:justify-between md:pl-8 xl:pl-16">
          <div className="md:flex justify-between">
            <div className="md:w-[60%]">
              <Skeleton className="w-full h-[1.5rem]  xl:h-[2rem]"></Skeleton>
              <div className="w-full flex gap-4 my-4">
                <Skeleton className="w-full h-[1rem] xl:h-[1.3rem]"></Skeleton>
                <Skeleton className="w-full mx-2 px-2 h-[1rem] xl:h-[1.3rem]"></Skeleton>
                <Skeleton className="w-full h-[1rem] xl:h-[1.3rem]"></Skeleton>
              </div>
              <Skeleton className="w-full text-gray-700 mb-4 h-[1rem] xl:h-[1.3rem]"></Skeleton>
            </div>
            <div className="text-right pl-8 my-0 md:w-[40%]">
              <div>
                <Skeleton className="w-full xl:h-[1.3rem]"></Skeleton>
                <Skeleton className="w-full h-[1.25rem] xl:h-[1.5rem]"></Skeleton>
              </div>

              <div className="my-4 pl-8">
                <Skeleton className="w-full h-[1rem] xl:h-[1.3rem]"></Skeleton>
                <Skeleton className="w-full h-[1rem] xl:h-[1.3rem]"></Skeleton>
              </div>
            </div>
          </div>
          <div className="w-[90%] flex flex-row  justify-end self-end gap-8">
            <Skeleton className="w-40 h-8"></Skeleton>
            <Skeleton className="w-40 h-8 rounded"></Skeleton>
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchResultLoading;
