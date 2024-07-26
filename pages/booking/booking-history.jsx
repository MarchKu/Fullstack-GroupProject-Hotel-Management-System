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

const BookingHistory = () => {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isOverAday, setIsoverAday] = useState(true);
  const [user, setUser] = useState({});
  const { bookingHistory, getBookingHistoryByUsername, isLoading, isError } =
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

  useEffect(() => {
    if (user.username) {
      getBookingHistoryByUsername(user.username);
    }
  }, [user.username]);

  const changeDateClick = (created_at) => {
    let bookingDate = new Date(created_at);
    let currentDate = new Date();
    const timeleft = Math.floor((currentDate - bookingDate) / (1000 * 60 * 60));
    timeleft <= 24
      ? router.push("/change-date")
      : alert("Booking date over 24 hour booking date cannot be change");
  };

  const cancleClick = (created_at, id) => {
    let bookingDate = new Date(created_at);
    let currentDate = new Date();
    const timeleft = Math.floor((currentDate - bookingDate) / (1000 * 60 * 60));
    timeleft <= 24 ? setIsoverAday(false) : setIsoverAday(true);
  };
  return (
    <>
      <NavbarComponent isAuthenticated={isAuthenticated} />
      <section className="w-full px-[5%] md:px-[10%] flex flex-col justify-start items-center font-body">
        <h1 className="font-heading text-primary-heading text-[6rem] w-full text-left pb-14">
          Booking History
        </h1>
        {bookingHistory &&
          bookingHistory.map((history, index) => {
            return (
              <Accordion
                type="single"
                collapsible
                className="w-full text-gray-700"
              >
                <div
                  key={index}
                  id="index"
                  className="border-b min-h-[700px] md:min-h-[500px] xl:min-h-[650px] py-[5%] border-gray-300 flex flex-col justify-center items-center w-full md:flex-col md:justify-between md:items-center md:py-[2rem]"
                >
                  <div className="w-full h-[90%] flex">
                    <div className="w-[50%] h-full">
                      <div
                        className="relative w-screen h-[45%] md:w-[90%] md:h-[90%] bg-center bg-cover md:rounded-lg bg-gray-300 "
                        style={{
                          backgroundImage: `url(${history.main_image})`,
                        }}
                      ></div>
                    </div>

                    <div className="h-[55%] md:h-full md:w-[45%] xl:w-[50%]">
                      <div className="py-[5%] size-full flex flex-col md:w-full md:h-full md:justify-start gap-[2rem]">
                        <div className="w-full flex justify-between text-gray-800 items-center">
                          <h1 className="text-[2rem] font-semibold">
                            {history.type_name}
                          </h1>
                          <p>
                            Booking date:{" "}
                            {format(history.created_at, "EEE, dd MMMM yyyy")}
                          </p>
                        </div>
                        <div className="w-full flex gap-[1.5rem] text-gray-800">
                          <div className="flex flex-col">
                            <h3>check-in</h3>
                            <p>
                              <span className="pr-[0.5rem]">
                                {format(history.check_in, "EEE, dd MMMM yyyy")}
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
                                {format(history.check_out, "EEE, dd MMMM yyyy")}
                              </span>
                              <span className="pl-[0.5rem] border-l-[1px] border-gray-800">
                                Before 12:00PM
                              </span>
                            </p>
                          </div>
                        </div>

                        <AccordionItem value="item-1">
                          <AccordionTrigger className="bg-gray-200 px-[5%]">
                            Booking Detail
                          </AccordionTrigger>
                          <AccordionContent className="bg-gray-200 px-[5%]">
                            <div className="flex justify-between">
                              <h3>2 Guests (1 Night)</h3>
                              <h3>{history.payment_method}</h3>
                            </div>
                          </AccordionContent>
                          <AccordionContent className="bg-gray-200 px-[5%]">
                            <div className="flex justify-between">
                              <h3>{history.type_name}</h3>
                              <h3>{history.promotion_price}</h3>
                            </div>
                          </AccordionContent>
                          {history.special_request.map((request, index) => {
                            const data = JSON.parse(request);
                            return (
                              <AccordionContent
                                key={index}
                                className="bg-gray-200 px-[5%]"
                              >
                                <div className="flex justify-between">
                                  <h3>{data.name}</h3>
                                  <h3>{data.price}</h3>
                                </div>
                              </AccordionContent>
                            );
                          })}
                          <AccordionContent className="bg-gray-200 px-[5%] border-b-[1px] border-gray-400">
                            <div className="flex justify-between">
                              <h3>Promotion Code</h3>
                              <h3>{history.promotion}</h3>
                            </div>
                          </AccordionContent>
                          <AccordionContent className="bg-gray-200 px-[5%]">
                            <div className="flex justify-between pt-[1rem] items-center">
                              <h3>Total</h3>
                              <h3 className="font font-semibold text-[1.5rem]">
                                THB {history.total_price}
                              </h3>
                            </div>
                          </AccordionContent>
                          <AccordionContent className="bg-gray-300 px-[5%] pt-[1rem]">
                            <div className="flex flex-col justify-between gap-[1rem]">
                              <h3 className="font-semibold">
                                Additional Request
                              </h3>
                              <h3>{history.additional_request}</h3>
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      </div>
                    </div>
                  </div>
                  <div className="h-[10%] w-full flex flex-row  justify-between items-center pl-[5%]">
                    {isOverAday ? (
                      <button
                        onClick={() => {
                          const bookingdate = history.created_at;
                          const bookingID = history.booking_id;
                          cancleClick(bookingdate, bookingID);
                        }}
                      >
                        <Dialog className="flex flex-col">
                          <DialogTrigger className="text-orange-500 hover:underline">
                            Cancel Booking
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle className="pb-[1rem]">
                                Cancel Bokking
                              </DialogTitle>
                              <DialogDescription className="pb-[1rem]">
                                Cancellation of the booking now will not be able
                                to request a refund. Are you sure you would like
                                to cancel this booking?
                              </DialogDescription>
                              <DialogFooter>
                                <button
                                  onClick={() => {
                                    const bookingID = history.booking_id;
                                    router.push(
                                      `/booking/cancel-booking/${bookingID}`
                                    );
                                  }}
                                >
                                  <Button variant="outline">
                                    Yes, I want to cancel
                                  </Button>
                                </button>
                                <DialogClose asChild>
                                  <Button type="button">
                                    No, Don’t Cancel
                                  </Button>
                                </DialogClose>
                              </DialogFooter>
                            </DialogHeader>
                          </DialogContent>
                        </Dialog>
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          const bookingdate = history.created_at;
                          const bookingID = history.booking_id;
                          cancleClick(bookingdate, bookingID);
                        }}
                      >
                        <Dialog className="flex flex-col">
                          <DialogTrigger className="text-orange-500 hover:underline">
                            Cancel Booking
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle className="pb-[1rem]">
                                Cancel Bokking
                              </DialogTitle>
                              <DialogDescription className="pb-[1rem]">
                                Are you sure you would like to cancel this
                                booking?
                              </DialogDescription>
                              <DialogFooter>
                                <button
                                  onClick={() => {
                                    const bookingID = history.booking_id;
                                    router.push(
                                      `/booking/refund-booking/${bookingID}`
                                    );
                                  }}
                                >
                                  <Button variant="outline">
                                    Yes, I want to cancel and request refund
                                  </Button>
                                </button>
                                <DialogClose asChild>
                                  <Button type="button">
                                    No, Don’t Cancel
                                  </Button>
                                </DialogClose>
                              </DialogFooter>
                            </DialogHeader>
                          </DialogContent>
                        </Dialog>
                      </button>
                    )}

                    <div className="h-full flex items-center gap-[1.5rem]">
                      <button
                        onClick={() => {
                          const roomID = history.room_id;
                          router.push(`/rooms/${roomID}`);
                        }}
                        className="text-orange-500 hover:underline"
                      >
                        Room Deatail
                      </button>
                      <button
                        onClick={() => {
                          const bookingdate = history.created_at;
                          const bookingID = history.booking_id;
                          changeDateClick(bookingdate, bookingID);
                        }}
                        className="w-40 xl:w-[180px] rounded  md:h-full"
                      >
                        <Button className="size-full">Change date</Button>
                      </button>
                    </div>
                  </div>
                </div>
              </Accordion>
            );
          })}
      </section>
      <FooterComponent />
    </>
  );
};

export default BookingHistory;
