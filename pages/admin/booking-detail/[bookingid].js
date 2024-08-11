import Sidebar from "@/components/hotel-information/Sidebar";
import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { dateFormatter } from "@/hooks/useDateFormatter";
import { Skeleton } from "@/components/ui/skeleton";

export default function BookingDetail() {
  const [bookingData, setBookingData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const dateDifference = (check_in, check_out) => {
    const d1 = new Date(check_out);
    const d2 = new Date(check_in);

    const diffInMs = d1 - d2;

    const diffInDays = diffInMs / (1000 * 60 * 60 * 24);

    return Math.abs(diffInDays);
  };

  const router = useRouter();

  const bookingId = router.query.bookingid;

  const getBookingDataById = async (bookingId) => {
    try {
      setIsLoading(true);
      const res = await axios.get(
        `https://neatly-hotel.vercel.app/api/booking/${bookingId}`,
        { method: "GET" }
      );
      setBookingData(res.data);
      setIsLoading(false);
      setIsError(false);
    } catch (error) {
      console.log(error.message);
      setIsError(true);
    }
  };

  useEffect(() => {
    if (bookingId) {
      getBookingDataById(bookingId);
    }
  }, [bookingId]);

  return (
    <>
      <div className="flex flex-row">
        <Sidebar isAtBookingDetail={true} />
        <div className="w-full bg-gray-100">
          <header className="flex flex-row justify-start items-center gap-5 px-16 py-5 bg-white">
            <a href="/admin/bookings">
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M14.7895 7.00498H3.61953L8.49953 2.12498C8.88953 1.73498 8.88953 1.09498 8.49953 0.704976C8.10953 0.314976 7.47953 0.314976 7.08953 0.704976L0.499531 7.29498C0.109531 7.68498 0.109531 8.31498 0.499531 8.70498L7.08953 15.295C7.47953 15.685 8.10953 15.685 8.49953 15.295C8.88953 14.905 8.88953 14.275 8.49953 13.885L3.61953 9.00498H14.7895C15.3395 9.00498 15.7895 8.55498 15.7895 8.00498C15.7895 7.45498 15.3395 7.00498 14.7895 7.00498Z"
                  fill="#9AA1B9"
                />
              </svg>
            </a>
            {bookingData.map((item, index) => (
              <p key={index}>
                <span className="text-[#2A2E3F] text-xl font-semibold">
                  {item.full_name}
                </span>
                <span className="text-[#2A2E3F] ml-5 text-xl font-normal">
                  {item.type_name}
                </span>
              </p>
            ))}
          </header>
          <div className="bg-white mt-12 mx-16 pb-10">
            <div className="h-screen flex flex-col gap-10 px-20 pt-10 overflow-scroll overflow-x-hidden">
              {isLoading ? (
                <div>
                  <Skeleton className="h-screen px-20 pt-10 bg-slate-300" />
                </div>
              ) : isError ? (
                <p>Error</p>
              ) : (
                bookingData.map((item, index) => (
                  <>
                    <div key={index}>
                      <h1 className="text-gray-600 text-xl font-semibold p-1">
                        Customer name
                      </h1>
                      <p className="text-base font-normal p-1">
                        {item.full_name}
                      </p>
                    </div>
                    <div>
                      <h1 className="text-gray-600 text-xl font-semibold p-1">
                        Guest(s)
                      </h1>
                      <p className="text-base font-normal p-1">
                        {item.room_capacity}
                      </p>
                    </div>
                    <div>
                      <h1 className="text-gray-600 text-xl font-semibold p-1">
                        Room type
                      </h1>
                      <p className="text-base font-normal p-1">
                        {item.type_name}
                      </p>
                    </div>
                    <div>
                      <h1 className="text-gray-600 text-xl font-semibold p-1">
                        Amount
                      </h1>
                      <p className="text-base font-normal p-1">
                        {item.amount_booking} room
                      </p>
                    </div>
                    <div>
                      <h1 className="text-gray-600 text-xl font-semibold p-1">
                        Bed type
                      </h1>
                      <p className="text-base font-normal p-1">
                        {item.bed_type}
                      </p>
                    </div>
                    <div>
                      <h1 className="text-gray-600 text-xl font-semibold p-1">
                        Check-in
                      </h1>
                      <p className="text-base font-normal p-1">
                        {dateFormatter(item.check_in)}
                      </p>
                    </div>
                    <div>
                      <h1 className="text-gray-600 text-xl font-semibold p-1">
                        Check-out
                      </h1>
                      <p className="text-base font-normal p-1">
                        {dateFormatter(item.check_out)}
                      </p>
                    </div>
                    <div>
                      <h1 className="text-gray-600 text-xl font-semibold p-1">
                        Stay (total)
                      </h1>
                      <p className="text-base font-normal p-1">
                        {dateDifference(item.check_in, item.check_out)} night(s)
                      </p>
                    </div>
                    <div>
                      <h1 className="text-gray-600 text-xl font-semibold p-1">
                        Booking date
                      </h1>
                      <p className="text-base font-normal p-1">
                        {dateFormatter(item.created_at)}
                      </p>
                    </div>
                    <div className="flex flex-col gap-4 bg-gray-100 px-6 py-4">
                      <p className="text-right text-base text-gray-600 font-normal">
                        Payment success via{" "}
                        <span className="font-semibold">
                          {item.payment_method}
                        </span>
                      </p>
                      <div className="flex flex-row justify-between">
                        <span className="text-base text-gray-900 font-normal">
                          {item.type_name}
                        </span>
                        <span className="text-base text-gray-900 font-semibold">
                          {item.promotion_price
                            ? (
                                Number(item.promotion_price) *
                                dateDifference(item.check_in, item.check_out)
                              ).toLocaleString("en-US")
                            : (
                                Number(item.current_price) *
                                dateDifference(item.check_in, item.check_out)
                              ).toLocaleString("en-US")}
                        </span>
                      </div>
                      <div>
                        {item.special_request ? (
                          item.special_request.map((item, index) => {
                            const data = JSON.parse(item);
                            return (
                              <div
                                key={index}
                                className="mb-5 flex flex-row justify-between"
                              >
                                <span className="text-base text-gray-900 font-normal">
                                  {data.name}
                                </span>
                                <span className="text-base text-gray-900 font-semibold">
                                  {data.price.toLocaleString("en-US")}
                                </span>
                              </div>
                            );
                          })
                        ) : (
                          <></>
                        )}
                      </div>
                      <div className="flex flex-row justify-between">
                        <span className="text-base text-gray-900 font-normal">
                          {item.promotion_discount ? "Discount" : ""}
                        </span>
                        <span className="text-base text-gray-900 font-semibold">
                          {item.promotion_discount
                            ? item.promotion_discount
                            : ""}
                        </span>
                      </div>
                      <hr />
                      <div className="flex flex-row justify-between mt-10">
                        <span className="text-base text-gray-900 font-normal">
                          Total
                        </span>
                        <span className="text-xl text-gray-900 font-semibold">
                          THB {Number(item.total_price).toLocaleString("en-US")}
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-col gap-4 bg-gray-100 px-6 py-4">
                      <p className="text-gray-700 text-base font-semibold p-1">
                        Additional Request
                      </p>
                      <p className="text-gray-700 text-base font-normal p-1">
                        {item.additional_request}
                      </p>
                    </div>
                  </>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
