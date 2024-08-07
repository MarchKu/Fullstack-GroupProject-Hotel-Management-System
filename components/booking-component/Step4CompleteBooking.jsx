import { Button } from "../ui/button";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useBookingContext } from "@/contexts/booking";
import { format } from "date-fns";

const Step4CompleteBooking = () => {
  const router = useRouter();
  const { username, bookingID } = router.query;
  const { bookingData, updateBookingData } = useBookingContext();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const data = {
      booking_id: bookingID,
      payment_method: "Credit Card",
      status: "success",
    };
    console.log(data);

    const update = updateBookingData(data);
    if (update) {
      setLoading(true);
    }
  }, [bookingID]);

  return loading ? (
    <>
      <div class="w-full pb-8 md:px-[5%] lg:px-[10%] md:pb-32">
        <div className="w-full  flex flex-col items-center gap-8 md:mt-8  md:w-[100%] md:p-8 bg-white">
          <div className="max-w-[738px] h-full min-h-[428px] rounded bg-green-700 text-white">
            <div className="w-full   py-8 px-4 md:px-32   rounded bg-green-800">
              <h1 className="text-5xl text-center font-serif tracking-tighter font-medium mb-8">
                Thank you for booking
              </h1>
              <p className="text-center ">
                We are looking forward to hosting you at our place. We will send
                you more information about check-in and staying at our Neatly
                closer to your date of reservation
              </p>
            </div>
            <div className="w-full min-h-[366px] px-10 pt-5 flex flex-col">
              <div className="flex flex-col gap-4 md:flex-row md:justify-between  mb-8 rounded-sm bg-green-600 p-6">
                <div className="">
                  <p className="font-semibold">
                    {format(bookingData.check_in, "EEE, dd MMM yyyy")} -
                    {format(bookingData.check_out, "EEE, dd MMM yyyy")}
                  </p>
                  <p>2 Guests</p>
                </div>
                <div className="flex items-center gap-4">
                  <div>
                    <p className="font-semibold">Check-in</p>
                    <p>After 2.00 PM</p>
                  </div>
                  <div>
                    <p className="font-semibold">Check-out</p>
                    <p>Before 12.00 PM</p>
                  </div>
                </div>
              </div>

              <div className="flex justify-between mb-4">
                <p className="text-gray-300">{bookingData.type_name}</p>
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
                          ? JSON.parse(request).price.toLocaleString("en-US", {
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
              {bookingData.promotion_discount ? (
                <div className="flex justify-between mb-8">
                  <p className="text-gray-300">Promotion Code</p>
                  <p className="font-semibold">
                    {" "}
                    -
                    {Number(bookingData.promotion_discount).toLocaleString(
                      "en-US",
                      {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      }
                    )}{" "}
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

          <div className="flex flex-col gap-4 md:flex-row">
            <button
              className="w-[320px] md:w-[200px] text-orange-500 order-2 md:order-1"
              onClick={() => router.push(`/booking/${username}?page=1`)}
            >
              Check Booking Detail
            </button>
            <Button
              className="w-[320px] md:w-[200px] order-1 md:order-2"
              onClick={() => router.push("/")}
            >
              Back to Home
            </Button>
          </div>
        </div>
      </div>
    </>
  ) : (
    <p>Loading...</p>
  );
};

export default Step4CompleteBooking;
