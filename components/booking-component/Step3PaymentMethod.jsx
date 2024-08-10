import { Button } from "../ui/button";
import { BriefcaseBusiness, Banknote, Check, CreditCard } from "lucide-react";
import { format } from "date-fns";
import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/router";
import { useBookingContext } from "@/contexts/booking";
import { Payment } from "../payment/payment";
import axios from "axios";

const Step3PaymentMethod = ({ nextStep, prevStep }) => {
  const {
    getBookingData,
    bookingData,
    updateBookingData,
    deleteBookingData,
    promotionCode,
    discount,
    codeError,
    totalPrice,
    setTotalPrice,
    timeLeft,
    checkRoomBooked,
  } = useBookingContext();

  const [payment, setPayment] = useState();
  const [code, setCode] = useState();
  const [isConfirmDisabled, setIsConfirmDisabled] = useState(true);

  const router = useRouter();
  const { username, bookingID } = router.query;

  useEffect(() => {
    checkRoomBooked();
  }, [checkRoomBooked]);

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

  const handleSelectPayment = (method) => {
    setPayment(() => {
      if (!payment || payment !== method) {
        return method;
      } else {
        return "";
      }
    });
  };

  useEffect(() => {
    if (payment === "Cash") {
      setIsConfirmDisabled(false);
    } else {
      setIsConfirmDisabled(true);
    }
  }, [payment]);

  // Debounce function
  const debounce = (func, delay, minChars = 0) => {
    let timer;
    return function (...args) {
      clearTimeout(timer);

      if (args[0].length >= minChars) {
        timer = setTimeout(() => func.apply(this, args), delay);
      }
    };
  };

  const getPromotionDiscount = useCallback((code) => {
    promotionCode(code);
  }, []);

  const [tempDiscount, setTempDiscount] = useState(0);
  const discountPrice = useCallback(() => {
    if (discount && discount > 0) {
      setTempDiscount(Number(discount));
      const newTatalPrice = totalPrice - discount;
      setTotalPrice(newTatalPrice);
    } else if (!discount && tempDiscount) {
      const newTatalPrice = totalPrice + tempDiscount;
      setTotalPrice(newTatalPrice);
      setTempDiscount(0);
    }
  }, [discount]);

  useEffect(() => {
    discountPrice();
  }, [discountPrice]);

  useEffect(() => {
    debounce(getPromotionDiscount(code), 1000, 4);
  }, [code, getPromotionDiscount]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  const handleConfirm = async () => {
    const isRoomAvailable = await checkRoomBooked();
    if (isRoomAvailable) {
      if (payment === "Cash") {
        const data = {
          booking_id: bookingData.booking_id,
          status: "success",
          total_price: totalPrice,
          payment_method: "Cash",
          promotion_discount: discount,
        };
        const updete = updateBookingData(data);
        if (updete) {
          nextStep();
          const query = {
            username: username,
            bookingID: bookingID,
            bookingStep: 4,
          };
          router.push({ pathname: "/booking", query: query });
        }
      } else if (payment === "Credit Card") {
        const data = {
          booking_id: bookingData.booking_id,
          status: "pending",
          total_price: totalPrice,
          payment_method: "Credit Card",
          promotion_discount: discount,
        };
        const updateBookingData = async () => {
          console.log(data);

          try {
            await axios.patch(`http://localhost:3000/api/booking`, data);
          } catch (error) {
            console.log(error.message);
          }
        };
        updateBookingData();
      }
    }
  };

  const handlePrev = () => {
    prevStep();
    const query = {
      username: username,
      bookingID: bookingID,
      bookingStep: 2,
    };
    router.push({ pathname: "/booking", query: query });
  };

  return bookingData ? (
    <div class="max-w-[1440px] w-full">
      <div class="w-full p-4 h-full mb-8 lg:px-8 xl:px-28 pb-8 md:pb-32">
        <header className="py-8 px-4 md:p-0 md:pt-10 border-b border-gray-300">
          <h1 class="text-4xl mb-6 font-heading md:text-[68px] font-medium text-green-800">
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
                <div className="w-16 h-16 rounded-sm bg-orange-100 flex items-center justify-center text-[28px] font-semibold text-orange-500">
                  2
                </div>
                <span className="text-xl font-semibold ml-4 text-gray-900">
                  Special Request
                </span>
              </div>
              <div className="flex items-center">
                <div className="w-16 h-16 rounded-sm bg-orange-500 flex items-center justify-center text-[28px] font-semibold text-white">
                  3
                </div>
                <span className="text-xl font-semibold ml-4 text-orange-500">
                  Payment Method
                </span>
              </div>
            </div>
          </div>
        </header>

        <div className="w-full relative">
          <div className="w-full flex flex-col py-8 sm:px-2 lg:px-4 xl:px-8 gap-8 md:mt-8  md:w-[50%] lg:w-[60%] xl:w-[60%]  md:border bg-white">
            <div className="w-full flex flex-col">
              <div className="w-full gap-4 mb-8 flex lg:gap-12  justify-between">
                <button
                  onClick={() => handleSelectPayment("Credit Card")}
                  className={`w-[322px] lg:h-[80px] text-xl font-semibold  lg:px-4 py-2 rounded flex justify-center items-center shadow-lg ${
                    payment === "Credit Card"
                      ? "border border-orange-500 text-orange-500"
                      : "border border-gray-300 text-gray-600"
                  }`}
                >
                  <CreditCard className="w-8 h-8 mr-4" /> Credit Card
                </button>
                <button
                  onClick={() => handleSelectPayment("Cash")}
                  className={`w-[322px] lg:h-[80px] text-xl font-semibold  px-4 py-2 rounded flex justify-center items-center shadow-lg ${
                    payment === "Cash"
                      ? "border border-orange-500 text-orange-500"
                      : "border border-gray-300 text-gray-600"
                  }`}
                >
                  <Banknote className="w-8 h-8 mr-4" /> Cash
                </button>
              </div>
              {payment === "Credit Card" ? (
                <div>
                  <Payment paymentUpdate={handleConfirm} username={username} />
                </div>
              ) : (
                ""
              )}

              <div className="lg:px-12 xl:px-10">
                <label htmlFor="promotion" className="text-gray-900">
                  Promotion Code
                </label>
                <input
                  id="promotion"
                  type="text"
                  className="w-full p-2 border border-border rounded outline-none"
                  onChange={(e) => {
                    setCode(e.target.value);
                  }}
                  placeholder="Enter Promotion Code"
                />
                {codeError && code && <p className="text-red">{codeError}</p>}
                {discount && (
                  <p className="text-lime-500 flex">
                    <Check /> Discount: {discount} THB
                  </p>
                )}
              </div>
            </div>

            <div className="flex flex-col items-center md:absolute md:right-0 md:top-0">
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
                <div className="w-full px-5 pt-5 flex flex-col">
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
                    <p>2 Guests</p>
                  </div>
                  <div className="flex justify-between mb-4">
                    <p>{bookingData.type_name}</p>
                    <p className="font-semibold">
                      {bookingData.night > 1
                        ? `${bookingData.night} Nights x `
                        : ""}

                      {bookingData.promotion_price
                        ? Number(bookingData.promotion_price).toLocaleString(
                            "en-US",
                            {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            }
                          )
                        : Number(bookingData.current_price).toLocaleString(
                            "en-US",
                            {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            }
                          )}
                    </p>
                  </div>
                  <div className="mb-8">
                    <ul className="flex flex-col gap-4 mb-4">
                      {bookingData.standard_request.map((request, index) => (
                        <li key={index} className="flex justify-between">
                          <p className="text-gray-300"> {request} </p>
                        </li>
                      ))}
                    </ul>
                    <ul className="flex flex-col gap-4">
                      {bookingData.special_request.map((request, index) => (
                        <li key={index} className="flex justify-between">
                          <p className="text-gray-300">
                            {" "}
                            {JSON.parse(request).name}{" "}
                          </p>
                          <p className="font-semibold">
                            {request
                              ? JSON.parse(request).price.toLocaleString(
                                  "en-US",
                                  {
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2,
                                  }
                                )
                              : ""}
                          </p>
                        </li>
                      ))}
                    </ul>
                  </div>
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
                    Able to change check-in or check-out date booking within 24
                    hours of the booking date
                  </li>
                </ul>
              </div>
            </div>
            <div className="flex justify-between lg:px-12 xl:px-10">
              <button
                className="w-[100px] text-orange-500"
                onClick={() => handlePrev()}
              >
                Back
              </button>

              {/* former button */}
              <Button
                disabled={isConfirmDisabled}
                className="w-[200px]"
                onClick={handleConfirm}
              >
                Confirm Booking
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <p>Loading...</p>
  );
};

export default Step3PaymentMethod;
