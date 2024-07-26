import { Button } from "../ui/button";
import { Checkbox } from "@/components/ui/checkbox";

import { BriefcaseBusiness } from "lucide-react";
import { useState, useEffect } from "react";

const Step2SpecialRequest = ({ nextStep, prevStep }) => {
  const [bookingData, setBookingData] = useState();

  const [standardRequest, setStandardRequest] = useState([]);
  const [specialRequest, setSpecialRequest] = useState([]);
  const [additionalRequests, setAdditionalRequest] = useState("");
  const [totalPrice, setTotalPrice] = useState();

  useEffect(() => {
    const getBookingData = localStorage.getItem("bookingData");
    if (getBookingData) {
      const parsedData = JSON.parse(getBookingData);
      setBookingData(parsedData);

      if (parsedData.standard_request) {
        setStandardRequest(parsedData.standard_request);
      }
      if (parsedData.special_request) {
        setSpecialRequest(parsedData.special_request);
      }
      if (parsedData.additional_request) {
        setAdditionalRequest(parsedData.additional_request);
      }
    }
  }, []);

  useEffect(
    () => {
      if (bookingData) {
        let tatalRoomPrice;
        if (bookingData.number_of_night > 1) {
          tatalRoomPrice = Number(
            bookingData.room_price * bookingData.number_of_night
          );
        } else {
          tatalRoomPrice = Number(bookingData.room_price);
        }

        let newTotalPrice = tatalRoomPrice;

        specialRequest.forEach((request) => {
          if (request.price) {
            newTotalPrice += request.price;
          }
        });

        setTotalPrice(newTotalPrice);
      }
    },
    [bookingData],
    [specialRequest]
  );

  const standardRequestsList = [
    { name: "earlyCheckIn", label: "Early check-in" },
    { name: "lateCheckOut", label: "Late check-out" },
    { name: "nonSmokingRoom", label: "Non-smoking room" },
    { name: "highFloorRoom", label: "A room on the high floor" },
    { name: "quietRoom", label: "A quiet room" },
  ];

  const specialRequestsList = [
    { name: "babyCot", label: "Baby cot", price: 400 },
    {
      name: "airportTransfer",
      label: "Airport transfer",
      price: 200,
    },
    { name: "extraBed", label: "Extra bed", price: 500 },
    { name: "extraPillows", label: "Extra pillows", price: 100 },
    {
      name: "phoneChargers",
      label: "Phone chargers and adapters",
      price: 100,
    },
    { name: "breakfast", label: "Breakfast", price: 150 },
  ];

  const handleCheckedChange = (isChecked, request, requestType) => {
    if (requestType === "standard") {
      setStandardRequest((prevStandardRequest) => {
        if (isChecked) {
          return [...prevStandardRequest, request.label];
        } else {
          return prevStandardRequest.filter((r) => r !== request.label);
        }
      });
    }

    if (requestType === "special") {
      setSpecialRequest((prevSpecialRequest) => {
        if (isChecked) {
          return [
            ...prevSpecialRequest,
            { name: request.label, price: request.price },
          ];
        } else {
          return prevSpecialRequest.filter((r) => r.name !== request.label);
        }
      });

      if (request.price) {
        setTotalPrice((prevTotalPrice) => {
          if (isChecked) {
            return prevTotalPrice + request.price;
          } else {
            return prevTotalPrice - request.price;
          }
        });
      }
    }
  };

  const isChecked = (request, requestType) => {
    if (requestType === "standard") {
      return standardRequest.some((r) => r === request.label);
    } else if (requestType === "special") {
      return specialRequest.some((r) => r.name === request.label);
    }
  };

  const handleAdditional = (e) => {
    const additional = e.target.value;
    setAdditionalRequest(additional);
  };

  const setData = () => {
    const newBookingData = {
      ...bookingData,
      standard_request: [...standardRequest],
      special_request: [...specialRequest],
      additional_request: additionalRequests,
      total_price: totalPrice,
    };
    localStorage.setItem("bookingData", JSON.stringify(newBookingData));
  };

  const handleNext = () => {
    setData();
    nextStep();
  };

  const handlePrev = () => {
    setData();
    prevStep();
  };

  return bookingData ? (
    <>
      <div class="w-full pb-8 md:px-[5%] lg:px-[10%] md:pb-32">
        <header className="py-8 px-4 md:p-0 md:pt-24 border-b border-gray-300">
          <h1 class="text-4xl mb-6 font-serif md:text-[68px] font-medium text-green-800 tracking-tighter">
            Booking Room
          </h1>
          <div className=" font-body w-full h-[200px] md:h-[146px] flex">
            <div className="w-full flex flex-col gap-[5%] md:flex-row">
              <div className="flex items-center">
                <div className="w-16 h-16 rounded-sm bg-orange-100 flex items-center justify-center text-[28px] font-semibold text-orange-500">
                  1
                </div>
                <span className="text-xl font-semibold ml-4 text-gray-900">
                  Basic Information
                </span>
              </div>
              <div className="flex items-center">
                <div className="w-16 h-16 rounded-sm bg-orange-500 flex items-center justify-center text-[28px] font-semibold text-white">
                  2
                </div>
                <span className="text-xl font-semibold ml-4 text-orange-500">
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

        <div className="w-full p-4 flex flex-col gap-8 md:mt-8  md:w-[45%] lg:w-[50%] xl:w-[60%] md:p-8 md:border bg-white">
          <div className="flex flex-col">
            <div className="mb-8">
              <h2 className="text-xl text-gray-800">Standard Request</h2>
              <p className="text-sm text-gray-600">
                These requests are not confirmed (Depend on the available room)
              </p>
            </div>
            <div className="flex flex-col gap-4 mb-8">
              {standardRequestsList.map((request, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <Checkbox
                    id={request.name}
                    className="w-6 h-6 data-[state=checked]:bg-orange-500 data-[state=checked]:border-none border-gray-400 "
                    name={`${request.name} (+THB${request.price})`}
                    onCheckedChange={(checked) =>
                      handleCheckedChange(checked, request, "standard")
                    }
                    checked={isChecked(request, "standard")}
                  />
                  <label
                    htmlFor={request.name}
                    className=" font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-gray-700"
                  >
                    {request.label}
                  </label>
                </div>
              ))}
            </div>

            <div className="mb-8">
              <h2 className="text-xl text-gray-800">Special Request</h2>
              <p className="text-sm text-gray-600">
                Additional charge may apply
              </p>
            </div>
            <div className="flex flex-col gap-4 mb-8">
              {specialRequestsList.map((request, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <Checkbox
                    id={request.name}
                    className="w-6 h-6 data-[state=checked]:bg-orange-500 data-[state=checked]:border-none border-gray-400 "
                    name={`${request.name} (+THB${request.price})`}
                    onCheckedChange={(checked) =>
                      handleCheckedChange(checked, request, "special")
                    }
                    checked={isChecked(request, "special")}
                  />
                  <label
                    htmlFor={request.name}
                    className=" font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-gray-700"
                  >
                    {`${request.label} (+THB ${request.price})`}
                  </label>
                </div>
              ))}
            </div>
            <div>
              <label htmlFor="additional">Additional Request</label>
              <input
                type="text"
                className="block w-full h-[100px] px-3 py-2 rounded-sm border border-gray-400 focus:outline-none text-start content-start"
                onChange={(e) => handleAdditional(e)}
                value={additionalRequests}
              />
            </div>
          </div>

          <div className="md:pl-8 flex flex-col items-center md:absolute md:right-[5%] lg:right-[10%] xl:right-[15%] md:top-[445px]">
            <div className="w-[358px] h-full min-h-[428px] rounded bg-green-700 text-white">
              <div className="w-full h-[62px] p-4  rounded bg-green-800 flex justify-between">
                <h3 className="font-semibold text-xl flex gap-4">
                  <BriefcaseBusiness className="text-gray-500" /> Booking Detail
                </h3>
                <p className="w-[56px] h-[25px] rounded text-orange-700 bg-orange-200 text-center ">
                  04:55
                </p>
              </div>
              <div className="w-full min-h-[366px] px-5 pt-5 flex flex-col">
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
                    {bookingData.check_in} - {bookingData.check_out}
                  </p>
                  <p>2 Guests</p>
                </div>
                <div className="flex justify-between mb-4">
                  <p className="text-gray-300">{bookingData.room_type}</p>
                  <p className="font-semibold">
                    {bookingData.number_of_night > 1
                      ? `${bookingData.number_of_night} Night x `
                      : ""}
                    {Number(bookingData.room_price).toLocaleString("en-US", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </p>
                </div>
                <div className="mb-8">
                  <ul className="flex flex-col gap-4 mb-4">
                    {standardRequest.map((request) => (
                      <li key={request.name} className="flex justify-between">
                        <p className="text-gray-300"> {request} </p>
                      </li>
                    ))}
                  </ul>
                  <ul className="flex flex-col gap-4">
                    {specialRequest.map((request) => (
                      <li key={request.name} className="flex justify-between">
                        <p className="text-gray-300"> {request.name} </p>
                        <p className="font-semibold">
                          {request.price
                            ? Number(request.price).toLocaleString("en-US", {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                              })
                            : ""}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
                {additionalRequests ? (
                  <div className="mb-8">
                    <p className="text-gray-300">{additionalRequests}</p>
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
            <div className="w-[358px] h-[124px] pt-5 pb-6 pr-4 pl-10 mt-6 bg-gray-300 text-xs">
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
            <button
              className="w-[100px] text-orange-500"
              onClick={() => handlePrev()}
            >
              Back
            </button>
            <Button className="w-[100px]" onClick={handleNext}>
              Next
            </Button>
          </div>
        </div>
      </div>
    </>
  ) : (
    <p>Loading...</p>
  );
};

export default Step2SpecialRequest;
