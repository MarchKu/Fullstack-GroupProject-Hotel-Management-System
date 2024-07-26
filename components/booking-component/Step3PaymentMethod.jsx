import { Button } from "../ui/button";
import { BriefcaseBusiness, Banknote } from "lucide-react";
import { useState, useEffect } from "react";
import useBooking from "@/hooks/use-booking";
import { Check } from "lucide-react";

const Step3PaymentMethod = ({ nextStep, prevStep }) => {
  const [bookingData, setBookingData] = useState();
  const [payment, setPayment] = useState();
  const [code, setCode] = useState();

  const {
    createBooking,
    promotionCode,
    codeError,
    discount,
    isLoading,
    isError,
  } = useBooking();

  useEffect(() => {
    const getBookingData = localStorage.getItem("bookingData");
    if (getBookingData) {
      const parsedData = JSON.parse(getBookingData);
      setBookingData(parsedData);
    }
  }, []);

  const handleSelectPayment = (method) => {
    setPayment(() => {
      if (!payment || payment !== method) {
        return method;
      } else {
        return "";
      }
    });
  };

  const booking = async () => {
    const data = {
      check_in: bookingData.check_in,
      check_out: bookingData.check_out,
      amount_booking: 1,
      user_id: bookingData.user_id,
      room_id: bookingData.room_id,
      night: bookingData.number_of_night,
      payment_method: payment,
      standard_request: bookingData.standard_request,
      special_request: bookingData.special_request,
      additional_request: bookingData.additional_request,
      total_price: bookingData.total_price,
      promotion: -discount,
    };

    await createBooking(data);

    nextStep();
  };

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

  const getPromotionDiscount = async (code) => {
    const inputCode = { code: code };
    await promotionCode(inputCode);
  };

  const [tempDiscount, setTempDiscount] = useState(0);
  const discountPrice = () => {
    if (discount && discount > 0) {
      setTempDiscount(discount);
      const newTatalPrice = bookingData.total_price - discount;
      setBookingData({ ...bookingData, total_price: newTatalPrice });
    } else if (!discount && tempDiscount) {
      const newTatalPrice = bookingData.total_price + tempDiscount;
      setBookingData({ ...bookingData, total_price: newTatalPrice });
    }
  };

  useEffect(() => {
    discountPrice();
  }, [discount]);

  useEffect(() => {
    debounce(getPromotionDiscount(code), 500, 4);
  }, [code]);

  if (isLoading) {
    return <h1>Booking in Progress...</h1>;
  }
  if (isError) {
    return <h1>Bookig Error</h1>;
  }

  const setData = () => {
    const newBookingData = {
      ...bookingData,
      discount: discount,
    };
    localStorage.setItem("bookingData", JSON.stringify(newBookingData));
  };

  const handleConfirm = () => {
    if (payment) {
      setData();
      booking();
    }
  };

  const handlePrev = () => {
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

        <div className="w-full p-4 flex flex-col gap-8 md:mt-8 md:w-[45%] lg:w-[50%] xl:w-[60%] md:p-8 md:border bg-white">
          <div className="flex flex-col">
            <div className="mb-8">
              <button
                onClick={() => handleSelectPayment("Cash")}
                className={`w-[322px] h-[80px] text-xl font-semibold  px-4 py-2 rounded flex justify-center items-center shadow-lg ${
                  payment === "Cash"
                    ? "border border-orange-500 text-orange-500"
                    : "border border-gray-300 text-gray-600"
                }`}
              >
                <Banknote className="w-8 h-8 mr-4" /> Cash
              </button>
            </div>
            <div className="">
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
                    {bookingData.standard_request.map((request) => (
                      <li key={request.name} className="flex justify-between">
                        <p className="text-gray-300"> {request} </p>
                      </li>
                    ))}
                  </ul>
                  <ul className="flex flex-col gap-4">
                    {bookingData.special_request.map((request) => (
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
                    {Number(bookingData.total_price).toLocaleString("en-US", {
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
            <Button className="w-[200px]" onClick={handleConfirm}>
              Confirm Booking
            </Button>
          </div>
        </div>
      </div>
    </>
  ) : (
    <p>Loading...</p>
  );
};

export default Step3PaymentMethod;
