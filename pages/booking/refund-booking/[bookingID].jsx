import React, { useState, useEffect } from "react";
import FooterComponent from "@/components/footer-component/FooterComponent";
import useBookingHistory from "@/hooks/use-booking-history";
import Link from "next/link";
import { useRouter } from "next/router";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";

const BookingHistory = () => {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isCancel, setIsCancel] = useState(false);
  const [user, setUser] = useState({});
  const { bookingHistory, cancelBooking, getBookingByID, isLoading, isError } =
    useBookingHistory();

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
      cancelBooking(bookingID);
      setIsCancel(true);
    }
  };
  return (
    <>
      {!bookingHistory ? (
        <section className="w-full min-h-[92vh] h-[90vh] px-[5%] flex flex-col justify-start items-center font-body">
          <div className="w-full h-full max-w-[1440px]">
            <h1 className="h-auto font-heading text-primary-heading text-[3rem] md:text-[4rem] xl:text-[5rem] w-full text-left content-center">
              Cancel Booking
            </h1>
            <div className="w-full h-full md:h-auto py-[5%] flex flex-col justify-center items-center md:justify-center md:items-center md:py-[2rem] ">
              <div className="w-full h-full flex flex-col md: justify-between md:flex-row mb-[1.5rem]gap-[10%]">
                <Skeleton className="w-full md:w-[45%] h-[50%] md:h-[400px]"></Skeleton>
                <div className="h-auto md:h-full w-full md:w-[50%]">
                  <div className="py-[5%] size-full flex flex-col md:w-full md:h-full md:justify-start gap-[1rem] md:gap-[2rem]">
                    <div className="w-full flex flex-col xl:flex-row xl:justify-between  xl:items-center gap-[1rem] md:gap-0">
                      <Skeleton className="h-[1.5rem] md:h-[2rem] w-[30%]"></Skeleton>
                      <Skeleton className="h-[1.5rem] md:h-[2rem] w-[60%]"></Skeleton>
                    </div>
                    <Skeleton className="h-[1.5rem] md:h-[2rem] w-full"></Skeleton>
                    <Skeleton className="h-[1.5rem] md:h-[2rem] w-full"></Skeleton>
                    <Skeleton className="h-[1.5rem] md:h-[2rem] w-full"></Skeleton>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : !isCancel && bookingHistory ? (
        <section className="w-full min-h-[92vh] h-[90vh] px-[5%] flex flex-col justify-start items-center font-body">
          <div className="w-full h-full max-w-[1440px]">
            <h1 className="h-auto font-heading text-primary-heading text-[3rem] md:text-[4rem] xl:text-[5rem] w-full text-left content-center">
              Request a Refund
            </h1>
            <div className="w-full h-full md:h-auto py-[5%] flex flex-col justify-center items-center md:justify-center md:items-center md:py-[2rem]">
              <div className="w-full h-full flex flex-col md: justify-between md:flex-row border-b border-gray-300 mb-[1.5rem]">
                <div className="w-full md:w-[45%] h-[50%] md:h-[400px]">
                  <div
                    className=" size-full md:h-[90%] bg-center bg-cover md:rounded-lg bg-gray-300 "
                    style={{
                      backgroundImage: `url(${bookingHistory.main_image})`,
                    }}
                  ></div>
                </div>

                <div className="h-auto md:h-full w-full md:w-[50%]">
                  <div className="py-[5%] size-full flex flex-col md:w-full md:h-full md:justify-start gap-[1rem] md:gap-[2rem]">
                    <div className="w-full flex flex-col xl:flex-row xl:justify-between  xl:items-center gap-[1rem] md:gap-0">
                      <h2 className="text-[1.5rem] md:text-[2rem] font-semibold">
                        {bookingHistory.type_name}
                      </h2>
                      <p className="text-gray-700">
                        Booking date:{" "}
                        {format(bookingHistory.created_at, "EEE, dd MMMM yyyy")}
                      </p>
                    </div>
                    <div className="w-full flex flex-col xl:flex-row gap-[1rem] font-body xl:justify-between">
                      <div className="w-full xl:w-[70%] flex flex-col text-gray-700 gap-[1rem]">
                        <p className="pr-[0.5rem]">
                          {format(bookingHistory.check_in, "EEE, dd MMMM yyyy")}{" "}
                          -{" "}
                          {format(
                            bookingHistory.check_out,
                            "EEE, dd MMMM yyyy"
                          )}
                        </p>
                        <p>2 Guests</p>
                      </div>
                      <div className="w-full xl:w-[30%] flex flex-col  xl:text-right ">
                        <p>Total refund</p>
                        <p className="text-[1.5rem] font-semibold">
                          THB{" "}
                          {bookingHistory.total_price &&
                            bookingHistory.total_price.replace(
                              /\B(?=(\d{3})+(?!\d))/g,
                              ","
                            )}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full flex flex-col md:flex-row justify-between items-center md:pl-[5%] gap-[1rem] md:gap-0">
                <button
                  onClick={() => window.history.back()}
                  className="text-orange-500 hover:underline"
                >
                  Back
                </button>
                <Dialog className="flex flex-col ">
                  <DialogTrigger className="text-orange-500 hover:underline order-first md:order-none w-full md:w-auto">
                    <Button className="w-full">Cancel Booking</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle className="pb-[1rem]">
                        Cancel Booking
                      </DialogTitle>
                      <DialogDescription className="pb-[1rem]">
                        Are you sure you want to confirm the refund this
                        booking?
                      </DialogDescription>
                      <DialogFooter>
                        <button
                          className="order-last md:order-none pb-[1rem] md:pb-0"
                          onClick={() => {
                            const bookingdate = history.created_at;
                            const bookingID = history.booking_id;
                            cancleClick(bookingdate, bookingID);
                          }}
                        >
                          <Button
                            variant="outline"
                            className="border-orange-500 text-orange-500 w-full"
                          >
                            Yes, I want to cancel and request refund
                          </Button>
                        </button>
                        <DialogClose asChild className="mb-[1rem] md:mb-0">
                          <Button type="button">No, Don’t Cancel</Button>
                        </DialogClose>
                      </DialogFooter>
                    </DialogHeader>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </div>
        </section>
      ) : (
        isCancel && (
          <section className="w-full h-auto px-[5%] flex flex-col justify-start items-center font-body pb-[5%] md:pt-[5%] md:min-h-[1000px]">
            <div className="w-full max-w-[1440px] lg:w-[70%] xl:w-[50%] h-auto pb-[10%] md:pb-[5%] flex flex-col ">
              <div className="w-full h-auto md:h-[40%] bg-green-800 flex flex-col justify-center items-center p-[5%] ">
                <h1 className="h-auto font-heading text-[2.5rem] md:text-[4rem] text-white text-center pb-[1rem]">
                  Your Request has been Submitted
                </h1>
                <p className="text-green-400 text-center text-[0.8rem] md:text-[1.25rem]">
                  The cancellation is complete.
                </p>
                <p className="text-green-400 text-center text-[0.8rem] md:text-[1.25rem]">
                  You will recieve an email with a detail of cancellation within
                  24 hours.
                </p>
              </div>
              <div className="w-full h-auto bg-green-700 py-[5%] px-[5%] md:px-[10%]">
                <div className="w-full h-[80%] bg-green-600 p-[5%] text-body flex flex-col justify-between mb-[1rem]">
                  <div className="flex flex-col items-start">
                    <h3 className="text-white text-[1.5rem] font-semibold pb-[2rem]">
                      {bookingHistory.type_name}
                    </h3>
                    <h3 className="text-white text-[0.8rem] md:text-[1.25rem] pb-[1rem]">{`${format(
                      bookingHistory.check_in,
                      "EEE, dd MMMM yyyy"
                    )} - ${format(
                      bookingHistory.check_out,
                      "EEE, dd MMMM yyyy"
                    )}`}</h3>
                    <p className="text-white text-[0.8rem] md:text-[1.25rem]">
                      2 Guests
                    </p>
                  </div>
                  <div className="text-green-300 text-[0.8rem] md:text-[1.25rem] flex flex-col gap-[1rem]">
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
                <hr className=" border-green-600" />
                <div className="w-full h-[15%] mt-[1rem] flex justify-between text-white font-body text-[1rem] md:text-[1.25rem]">
                  <p>Total Refund</p>
                  <p>
                    THB{" "}
                    {bookingHistory.total_price &&
                      bookingHistory.total_price.replace(
                        /\B(?=(\d{3})+(?!\d))/g,
                        ","
                      )}
                  </p>
                </div>
              </div>
            </div>

            <button onClick={() => window.history.back()}>
              <Button>Back to home</Button>
            </button>
          </section>
        )
      )}
    </>
  );
};

export default BookingHistory;
