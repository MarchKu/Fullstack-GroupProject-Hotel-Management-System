"use client";
import React, { useState, useEffect } from "react";
import { useSearchParams, useParams } from "next/navigation";
import NavbarComponent from "@/components/navigation-component/NavbarComponent";
import FooterComponent from "@/components/footer-component/FooterComponent";
import useBookingHistory from "@/hooks/use-booking-history";
import CheckDateBeforeModifie from "@/components/booking-history-component/Card-Footer";
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
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Skeleton } from "@/components/ui/skeleton";

const Index = () => {
  const searchParams = useSearchParams();
  const params = useParams();
  const page = searchParams.get("page");

  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isOverAday, setIsoverAday] = useState(true);
  const [isHidden, setHidden] = useState("");
  const [user, setUser] = useState({});
  const {
    bookingHistory,
    totalPage,
    getBookingHistoryByUsername,
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

  useEffect(() => {
    if (user.username) {
      getBookingHistoryByUsername(user.username, page);
    }
  }, [user.username, page]);

  const NoBookingHistory = () => {
    return (
      <div className="w-full h-[50vh] flex flex-col justify-center items-center gap-5">
        <p className="text-2xl font-extrabold text-center">
          You have no booking history.
        </p>
        <p className="text-center">
          Go back to our{" "}
          <a className="underline hover:text-primary-heading" href="/">
            homepage
          </a>{" "}
          and start planning your next trip!
        </p>
      </div>
    );
  };

  return (
    <>
      <NavbarComponent isAuthenticated={isAuthenticated} />
      <section className="w-full px-[5%]  md:px-[10%] flex flex-col justify-start items-center font-body py-[5%] xl:py-[1%]">
        <h1 className="font-heading text-primary-heading text-[3rem] md:text-[5rem] w-full text-left">
          Booking History
        </h1>
        {isLoading ? (
          <div className="w-full h-[50vh] flex flex-col justify-center items-center">
            <Skeleton className="w-[100px] h-[20px] rounded-full bg-slate-300" />
          </div>
        ) : isError || bookingHistory === null ? (
          true
        ) : !bookingHistory[0] ? (
          <NoBookingHistory />
        ) : (
          bookingHistory &&
          bookingHistory.map((history, index) => {
            return (
              <Accordion
                type="single"
                collapsible
                className="w-full text-gray-700"
                key={index}
              >
                <div
                  key={index}
                  id="index"
                  className="py-[5%] flex flex-col justify-center items-center w-full h-full md:h-[60%] md:justify-center md:items-center md:py-[2rem]"
                >
                  <div className="w-full h-auto flex flex-col md:flex-row border-b border-gray-300 mb-[1.5rem]">
                    <div className="w-full md:w-[50%] h-full md:h-[550px]">
                      <img
                        src={history.main_image}
                        alt="room image"
                        className="relative w-full h-full md:w-[90%] md:h-[90%] bg-center bg-cover md:rounded-lg bg-gray-300 object-cover object-center"
                      />
                    </div>

                    <div className="h-[55%] md:h-full md:w-[45%] xl:w-[50%]">
                      <div className="pt-[5%] size-full flex flex-col md:w-full md:h-full md:justify-start gap-[2rem]">
                        <div className="w-full flex flex-col md:flex-row justify-between text-gray-800 items-start md:items-center">
                          <h1 className="text-[2rem] font-semibold">
                            {history.type_name}
                          </h1>
                          {history.status === "cancelled" ? (
                            <div className="text-left md:text-right">
                              <p>
                                Booking date:{" "}
                                {format(
                                  history.created_at,
                                  "EEE, dd MMMM yyyy"
                                )}
                              </p>
                              <p>
                                Cancellation date:{" "}
                                {format(
                                  history.updated_at,
                                  "EEE, dd MMMM yyyy"
                                )}
                              </p>
                            </div>
                          ) : (
                            <p>
                              Booking date:{" "}
                              {format(history.created_at, "EEE, dd MMMM yyyy")}
                            </p>
                          )}
                        </div>
                        <div className="w-full flex flex-col md:flex-row gap-[1.5rem] text-gray-800">
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
                          {history.special_request !== null &&
                            history.special_request.map((request, index) => {
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
                          <AccordionContent className="bg-gray-300 px-[5%] pt-[1rem] mb-[1.5rem]">
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

                  {/* Button */}
                  <CheckDateBeforeModifie
                    bookingDate={history.created_at}
                    checkInDate={history.check_in}
                    bookingID={history.booking_id}
                    bookingStatus={history.status}
                    roomID={history.room_id}
                  />
                </div>
              </Accordion>
            );
          })
        )}
        <Pagination>
          <PaginationContent>
            <PaginationItem
              className={page <= 1 && "pointer-events-none opacity-50"}
            >
              <PaginationPrevious
                href={`/booking/${user.username}?page=${Number(page) - 1}`}
              />
            </PaginationItem>
            {Array.from({ length: totalPage }).map((page, index) => (
              <PaginationItem key={index}>
                <PaginationLink
                  href={`/booking/${user.username}?page=${index + 1}`}
                >
                  {index + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem
              className={page >= totalPage && "pointer-events-none opacity-50"}
            >
              <PaginationNext
                href={`/booking/${user.username}?page=${Number(page) + 1}`}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </section>
      <FooterComponent />
    </>
  );
};

export default Index;
