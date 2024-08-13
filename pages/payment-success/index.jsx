"use client";
import { useRouter } from "next/router";
import axios from "axios";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useBookingContext } from "@/contexts/booking";
import format from "date-fns/format";

export default function PaymentSuccess() {
  const [bookingData, setBookingData] = useState();
  const router = useRouter();
  const { amount, billId, bookingId } = router.query;

  useEffect(() => {
    const data = {
      booking_id: bookingId,
      payment_method: "Credit Card",
      status: "success",
    };

    const updateBookingData = async () => {
      console.log(data);

      try {
        await axios.patch(`https://neatly-hotel.vercel.app/api/booking`, data);
      } catch (error) {
        console.log(error.message);
      }
    };
    updateBookingData();
  }, [bookingId]);

  useEffect(() => {
    const fetchBillData = async () => {
      if (!billId) {
        console.error("billId is undefined or null");
        return;
      }

      try {
        const res = await axios.get(`/api/bills?bill_id=${billId}`);
        const data = res.data;

        // Handle special_request if it's a JSON string or already parsed
        const specialRequest = Array.isArray(data.special_request)
          ? data.special_request.map((request) =>
              typeof request === "string" ? JSON.parse(request) : request
            )
          : [];

        setBookingData({ ...data, special_request: specialRequest });
        console.log("data:", data);
      } catch (error) {
        console.error("Error fetching bill data:", error);
      }
    };

    fetchBillData();
  }, [billId]);

  if (!bookingData) {
    return <p>Loading...</p>;
  }
  return bookingData ? (
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
                  {bookingData.night > 1 ? `${bookingData.night} Night x ` : ""}
                  {Number(bookingData.current_price).toLocaleString("en-US", {
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
                  {bookingData.special_request ? (
                    bookingData.special_request.map((request) => (
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
                    ))
                  ) : (
                    <h1>Loading</h1>
                  )}
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
                    {bookingData.promotion_discount.toLocaleString("en-US", {
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

          <div className="flex flex-col gap-4 md:flex-row">
            <button
              className="w-[320px] md:w-[200px] text-orange-500 order-2 md:order-1"
              onClick={() => router.push("/booking/booking-history")}
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
}
