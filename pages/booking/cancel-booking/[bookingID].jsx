import React, { useState, useEffect } from "react";
import NavbarComponent from "@/components/navigation-component/NavbarComponent";
import FooterComponent from "@/components/footer-component/FooterComponent";
import useBookingHistory from "@/hooks/use-booking-history";
import Link from "next/link";
import { useRouter } from "next/router";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const BookingHistory = () => {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isCancel, setIsCancel] = useState(false);
  const [user, setUser] = useState({});
  const {
    bookingHistory,
    getBookingHistoryByUsername,
    deleteBooking,
    getBookingByID,
    isLoading,
    isError,
  } = useBookingHistory();

  useEffect(() => {
    const fetchUserData = async () => {
      const userData = localStorage.getItem("user");
      if (userData) {
        const parsedData = JSON.parse(userData);
        setUser(parsedData);
      }
    };
    fetchUserData();
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(Boolean(token));
  }, []);

  const { bookingID } = router.query;

  useEffect(() => {
    if (bookingID) {
      getBookingByID(bookingID);
      setIsCancel(false);
    }
  }, [bookingID]);

  const cancleTime = new Date();
  
  const cancleClick = () => {
    if (bookingID) {
      deleteBooking(bookingID);
      setIsCancel(true);
    }
  };
  return (
    <>
      <NavbarComponent isAuthenticated={isAuthenticated} />
      {!isCancel && bookingHistory ? (
        <section className="w-full h-[95vh] px-[5%] md:px-[10%] flex flex-col justify-start items-center font-body">
          <h1 className="h-[20%] font-heading text-primary-heading text-[6rem] w-full text-left pb-14">
            Cancel Booking
          </h1>
          <div className="border-b min-h-[700px] py-[5%] border-gray-300 flex flex-col justify-center items-center w-full h-[80%] md:h-[450px] md:flex-col md:justify-center md:items-center md:py-[2rem]">
            <div className="w-full h-[90%] flex">
              <div className="w-[50%] h-full">
                <div
                  className="relative w-screen h-[45%] md:w-[90%] md:h-[90%] bg-center bg-cover md:rounded-lg bg-gray-300 "
                  style={{
                    backgroundImage: `url(${bookingHistory.main_image})`,
                  }}
                ></div>
              </div>

              <div className="h-[55%] md:h-full md:w-[45%] xl:w-[50%]">
                <div className="py-[5%] size-full flex flex-col md:w-full md:h-full md:justify-start gap-[2rem]">
                  <div className="w-full flex justify-between text-gray-800 items-center">
                    <h1 className="text-[2rem] font-semibold">
                      {bookingHistory.type_name}
                    </h1>
                    <p>
                      Booking date:{" "}
                      {format(bookingHistory.created_at, "EEE, dd MMMM yyyy")}
                    </p>
                  </div>
                  <div className="w-full flex gap-[1.5rem] text-gray-800">
                    <div className="flex flex-col">
                      <h3>check-in</h3>
                      <p>
                        <span className="pr-[0.5rem]">
                          {format(bookingHistory.check_in, "EEE, dd MMMM yyyy")}
                        </span>
                        <span className="pl-[0.5rem] border-l-[1px] border-gray-800">
                          After 2:00 PM
                        </span>
                      </p>
                    </div>
                    <div className="flex flex-col">
                      <h3>check-out</h3>
                      <p>
                        <span className="pr-[0.5rem]">
                          {format(
                            bookingHistory.check_out,
                            "EEE, dd MMMM yyyy"
                          )}
                        </span>
                        <span className="pl-[0.5rem] border-l-[1px] border-gray-800">
                          Before 12:00PM
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full flex flex-row  justify-between items-center pl-[5%]">
              <Link
                href="/booking/booking-history"
                className="text-orange-500 hover:underline"
              >
                Cancel
              </Link>
              <button
                onClick={() => {
                  cancleClick();
                }}
              >
                <Button className="w-40 xl:w-[180px] rounded xl:text-[1.25rem]">
                  Cancel this booking
                </Button>
              </button>
            </div>
          </div>
        </section>
      ) : !bookingHistory ? (
        <div>Loading</div>
      ) : (
        isCancel && (
          <section className="w-full h-[95vh] px-[5%] md:px-[10%] flex flex-col justify-start items-center font-body  gap-[5%] pt-[5%]">
            <div className="w-[60%] h-[70%] flex flex-col ">
              <div className="w-full h-[30%] bg-green-800 flex flex-col justify-center items-center gap-[1.5rem]">
                <h1 className="font-heading text-[3rem] text-white">
                  The Cancellation is Complete
                </h1>
                <p className="text-green-400">The cancellation is complete.</p>
                <p className="text-green-400">
                  You will recieve an email with a detail of cancellation within
                  24 hours.
                </p>
              </div>
              <div className="w-full h-[70%] bg-green-700 py-[5%] px-[10%]">
                <div className="size-full bg-green-600 p-[5%] text-body flex flex-col justify-between">
                  <div className="flex flex-col items-start">
                    <h3 className="text-white text-[1.5rem] font-semibold pb-[2rem]">
                      {bookingHistory.type_name}
                    </h3>
                    <h3 className="text-white text-[1.25rem] pb-[1rem]">{`${format(
                      bookingHistory.check_in,
                      "EEE, dd MMMM yyyy"
                    )} - ${format(
                      bookingHistory.check_out,
                      "EEE, dd MMMM yyyy"
                    )}`}</h3>
                    <p className="text-white text-[1.25rem]">2 Guests</p>
                  </div>
                  <div className="text-green-300 text-[1.25rem] flex flex-col gap-[1rem]">
                    <p>{`Booking date: ${format(
                      bookingHistory.created_at,
                      "EEE, dd MMMM yyyy"
                    )}`}</p>
                    <p>{`Cancellation date: ${format(
                      cancleTime,
                      "EEE, dd MMMM yyyy"
                    )}`}</p>
                  </div>
                </div>
              </div>
            </div>
            <Button>
              <Link href="/booking/booking-history">Back to home</Link>
            </Button>
          </section>
        )
      )}

      <FooterComponent />
    </>
  );
};

export default BookingHistory;
