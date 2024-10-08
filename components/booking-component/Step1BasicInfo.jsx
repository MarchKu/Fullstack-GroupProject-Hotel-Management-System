import { Button } from "../ui/button";
import { BriefcaseBusiness } from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import { format, parse } from "date-fns";
import { useRouter } from "next/router";
import { useBookingContext } from "@/contexts/booking";
import LoadingBookingStep1 from "./bookignLoadingSkeleton/LoadingBookingStep1";

const Step1BasicInfo = ({ nextStep, prevStep }) => {
  const {
    bookingData,
    discount,
    totalPrice,
    setTotalPrice,
    timeLeft,
    checkRoomBooked,
    userData,
    getUserData,
  } = useBookingContext();

  //Get username from query parameter*/
  const router = useRouter();
  const { username, bookingID } = router.query;

  useEffect(() => {
    if (!userData) {
      getUserData(username);
    }
  }, [getUserData]);

  useEffect(() => {
    checkRoomBooked();
    console.log(bookingData);
  }, []);

  const setTotalPriceFunction = useCallback(() => {
    if (bookingData) {
      if (bookingData.total_price) {
        setTotalPrice(Number(bookingData.total_price));
      }
    }
  }, [bookingData]);

  useEffect(() => {
    setTotalPriceFunction();
  }, [setTotalPriceFunction]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  const handleNext = () => {
    const query = {
      username: `${username}`,
      bookingID: bookingID,
      bookingStep: 2,
    };
    router.push({ pathname: "/booking", query: query });
    // nextStep();
  };

  const handlePrev = () => {
    prevStep();
  };

  return (
    <div className="max-w-[1440px] w-full">
      <div className="w-full p-4 lg:px-8 xl:px-28 pb-8 md:pb-32 ">
        <header className="py-8 px-4 md:p-0 md:pt-10 border-b border-gray-300">
          <h1 className="text-4xl mb-6 font-heading md:text-[68px] font-medium text-green-800 ">
            Booking Room
          </h1>
          <div className=" font-body w-full h-[200px] md:h-[146px] flex">
            <div className="w-full flex flex-col gap-[5%] md:flex-row">
              <div className="flex items-center">
                <div className="w-16 h-16 rounded-sm bg-orange-500 flex items-center justify-center text-[28px] font-semibold text-white">
                  1
                </div>
                <span className="text-xl font-semibold ml-4 text-orange-500">
                  Basic Information
                </span>
              </div>
              <div className="flex items-center">
                <div className="w-16 h-16 rounded-sm bg-gray-200 flex items-center justify-center text-[28px] font-semibold text-gray-600">
                  2
                </div>
                <span className="text-xl font-semibold ml-4 text-gray-600">
                  Special Request
                </span>
              </div>
              <div className="flex items-center">
                <div className="w-16 h-16 rounded-sm bg-gray-200 flex items-center justify-center text-[28px] font-semibold text-gray-600">
                  3
                </div>
                <span className="text-xl font-semibold ml-4 text-gray-600">
                  Payment Method
                </span>
              </div>
            </div>
          </div>
        </header>

        {userData ? (
          <div className="w-full relative">
            <div className="w-full p-4 flex flex-col gap-8 md:mt-8  md:w-[50%] lg:w-[60%] xl:w-[60%] md:p-8 md:border  bg-white">
              <h3 className="text-xl font-semibold text-gray-600">
                Basic Information
              </h3>
              <div>
                <label
                  htmlFor="full-name"
                  className="block text-muted-foreground mb-1"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  id="full-name"
                  value={userData.full_name}
                  readOnly
                  className="w-full p-2 border border-border rounded outline-none"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-muted-foreground mb-1"
                >
                  Email
                </label>
                <input
                  type="text"
                  id="email"
                  value={userData.email}
                  readOnly
                  className="w-full p-2 border border-border rounded outline-none"
                />
              </div>
              <div>
                <label
                  htmlFor="id-number"
                  className="block text-muted-foreground mb-1"
                >
                  ID Number
                </label>
                <input
                  type="text"
                  id="id-number"
                  value={userData.id_number}
                  readOnly
                  className="w-full p-2 border border-border rounded outline-none"
                />
              </div>
              <div>
                <label
                  htmlFor="date-of-birth"
                  className="block text-muted-foreground mb-1"
                >
                  Date of Birth
                </label>
                <input
                  type="text"
                  id="date-of-birth"
                  value={format(userData.date_of_birth, "EEE, dd MMMM yyyy")}
                  readOnly
                  className="w-full p-2 border border-border rounded outline-none"
                />
              </div>
              <div>
                <label
                  htmlFor="country"
                  className="block text-muted-foreground mb-1"
                >
                  Country
                </label>
                <input
                  type="text"
                  id="country"
                  value={userData.country}
                  readOnly
                  className="w-full p-2 border border-border rounded outline-none"
                />
              </div>

              {bookingData && (
                <div className=" flex flex-col items-center md:absolute md:right-0 md:top-0">
                  <div className="w-[358px] h-full rounded bg-green-700 text-white">
                    <div className="w-full h-[62px] p-4  rounded bg-green-800 flex justify-between">
                      <h3 className="font-semibold text-xl flex gap-4">
                        <BriefcaseBusiness className="text-gray-500" /> Booking
                        Detail
                      </h3>
                      <p className="w-[56px] h-[25px] rounded text-orange-700 bg-orange-200 text-center ">
                        {formatTime(timeLeft)}
                      </p>
                    </div>
                    <div className="w-full  px-5 pt-5 flex flex-col">
                      <div className="flex justify-between mb-8">
                        <div>
                          <p className="font-semibold">Check-in</p>
                          <p>After 2.00 PM</p>
                        </div>
                        <div>
                          <p className="font-semibold">Check-out</p>
                          <p>Before 12.00 PM</p>
                        </div>
                      </div>
                      <div className="mb-8">
                        <p>
                          {format(bookingData.check_in, "EEE, dd MMM yyyy")} -
                          {format(bookingData.check_out, "EEE, dd MMM yyyy")}
                        </p>
                        <p>{bookingData.room_capacity} Guests</p>
                      </div>
                      <div className="flex justify-between mb-4">
                        <p>{bookingData.type_name}</p>
                        <p className="font-semibold text-right">
                          {bookingData.night > 1
                            ? `${bookingData.night} Nights x `
                            : ""}

                          {bookingData.promotion_price
                            ? Number(
                                bookingData.promotion_price
                              ).toLocaleString("en-US", {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                              })
                            : Number(bookingData.current_price).toLocaleString(
                                "en-US",
                                {
                                  minimumFractionDigits: 2,
                                  maximumFractionDigits: 2,
                                }
                              )}
                        </p>
                      </div>
                      {bookingData.standard_request && (
                        <div className="mb-8">
                          <ul className="flex flex-col gap-4 mb-4">
                            {bookingData.standard_request.map(
                              (request, index) => (
                                <li
                                  key={index}
                                  className="flex justify-between"
                                >
                                  <p className="text-gray-300"> {request} </p>
                                </li>
                              )
                            )}
                          </ul>
                          <ul className="flex flex-col gap-4">
                            {bookingData.special_request.map(
                              (request, index) => (
                                <li
                                  key={index}
                                  className="flex justify-between"
                                >
                                  <p className="text-gray-300">
                                    {" "}
                                    {JSON.parse(request).name}{" "}
                                  </p>
                                  <p className="font-semibold">
                                    {request
                                      ? JSON.parse(
                                          request
                                        ).price.toLocaleString("en-US", {
                                          minimumFractionDigits: 2,
                                          maximumFractionDigits: 2,
                                        })
                                      : ""}
                                  </p>
                                </li>
                              )
                            )}
                          </ul>
                        </div>
                      )}
                      {bookingData.additional_request ? (
                        <div className="mb-8">
                          <p className="text-gray-300">
                            {bookingData.additional_request}
                          </p>
                        </div>
                      ) : (
                        ""
                      )}
                      {discount ? (
                        <div className="flex justify-between mb-8">
                          <p className="text-gray-300">Promotion Code</p>
                          <p className="font-semibold">
                            {" "}
                            -
                            {discount.toLocaleString("en-US", {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            })}{" "}
                          </p>
                        </div>
                      ) : (
                        ""
                      )}
                      <div className="flex justify-between border-t border-gray-600 h-[75px] items-center">
                        <p className="text-gray-300">Total</p>
                        <p className="text-xl font-semibold">
                          THB{" "}
                          {Number(totalPrice).toLocaleString("en-US", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="w-[358px] h-[124px] pt-5 pb-6 pr-4 pl-10 mt-6 bg-gray-300 text-xs md:mb-8">
                    <ul className="list-disc list-outside flex flex-col gap-6 text-green-600">
                      <li>
                        Cancel booking will get full refund if the cancelation
                        occurs before 24 hours of the check-in date.
                      </li>
                      <li>
                        Able to change check-in or check-out date booking within
                        24 hours of the booking date
                      </li>
                    </ul>
                  </div>
                </div>
              )}

              <div className="flex justify-between">
                <button
                  className="w-[100px] text-orange-500"
                  onClick={handlePrev}
                >
                  Back
                </button>
                <Button className="w-[100px]" onClick={handleNext}>
                  Next
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <LoadingBookingStep1 />
        )}
      </div>
    </div>
  );
};

export default Step1BasicInfo;
