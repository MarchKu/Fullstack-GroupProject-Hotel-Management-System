import NavbarComponent from "@/components/navigation-component/NavbarComponent";
import { useRouter } from "next/router";
import axios from "axios";
import { useState, useEffect } from "react";
import { dateFormatter } from "@/hooks/useDateFormatter";
import { Calendar as CalendarIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { addDays, subDays } from "date-fns";
import toastr from "toastr";
import "toastr/build/toastr.min.css";
import { Skeleton } from "@/components/ui/skeleton";

export default function ChangeDatePage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [bookingData, setBookingData] = useState([]);
  const [newCheckInDate, setNewCheckInDate] = useState(null);
  const [newCheckOutDate, setNewCheckOutDate] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

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

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const checkIn = bookingData.map((item) => item.check_out);
  const checkOut = bookingData.map((item) => item.check_in);

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
        `https://neatly-hotel.vercel.app/api/booking/${bookingId}`
      );
      setBookingData(res.data);
      setIsLoading(false);
      setIsError(false);
    } catch (error) {
      console.log(error.message);
      setIsError(true);
    }
  };

  const changeBookingDataById = async (bookingId) => {
    try {
      await axios.put(
        `https://neatly-hotel.vercel.app/api/booking/${bookingId}`,
        {
          check_in: dateFormatter(newCheckInDate),
          check_out: dateFormatter(newCheckOutDate),
        }
      );
      toastr["success"]("Change check-in and check-out date successfully");
      setTimeout(function () {
        window.history.back();
      }, 2000);
    } catch (error) {
      console.log(error.message);
      toastr["error"]("Invalid check-in or check-out date");
      setTimeout(function () {
        window.location.reload();
      }, 2000);
    }
  };

  useEffect(() => {
    if (bookingId) {
      getBookingDataById(bookingId);
    }
  }, [bookingId]);

  useEffect(() => {
    if (
      newCheckInDate &&
      dateDifference(newCheckInDate, newCheckOutDate) !=
        dateDifference(checkIn, checkOut)
    ) {
      setNewCheckOutDate(
        addDays(newCheckInDate, dateDifference(checkIn, checkOut))
      );
    }
  }, [newCheckInDate]);

  useEffect(() => {
    if (
      newCheckOutDate &&
      dateDifference(newCheckInDate, newCheckOutDate) !=
        dateDifference(checkIn, checkOut)
    ) {
      setNewCheckInDate(
        subDays(newCheckOutDate, dateDifference(checkIn, checkOut))
      );
    }
  }, [newCheckOutDate]);

  const ConfirmModal = ({ show, handleClose }) => {
    return (
      <div
        className={`fixed inset-0 flex items-center justify-center bg-white bg-opacity-50 ${
          show ? "block" : "hidden"
        } `}
      >
        <div className="md:w-[631px] md:h-[200px] flex flex-col bg-white rounded-lg shadow-lg">
          <header className="flex flex-row justify-between items-baseline p-5">
            <p className="text-xl font-semibold">Change Date</p>
            <button onClick={handleClose}>
              <svg
                width="13"
                height="12"
                viewBox="0 0 13 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1.53125 10.8485L11.4706 1.15149M1.53125 1.15149L11.4706 10.8485"
                  stroke="#C8CCDB"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </button>
          </header>
          <hr />
          <p className="font-normal text-[#646D89] text-center p-5">
            Are you sure you want to change your check-in and check-out date?
          </p>
          <div className="flex flex-col-reverse md:flex-row md:justify-end px-5 gap-2">
            <Button
              className=" text-sm border-orange-500 text-orange-500 mb-[1.5rem] md:mb-0"
              variant="outline"
              onClick={handleClose}
            >
              {"No, I don't"}
            </Button>
            <Button
              onClick={() => changeBookingDataById(bookingId)}
              className="order-none"
            >
              Yes, I want to change
            </Button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <NavbarComponent isAuthenticated={isAuthenticated} />
      {!bookingData ? (
        <section className="w-full min-h-[92vh] h-[90vh] px-[5%] flex bg-[#E4E6ED] flex-col justify-start items-center font-body">
          <div className="w-full h-full max-w-[1440px]">
            <div className="h-auto font-heading text-primary-heading text-[3rem] md:text-[4rem] xl:text-[5rem] w-full text-left content-center">
              <h1>Change Check-in</h1>
              <h1>and Check-out Date</h1>
            </div>
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
      ) : (
        <section className="w-full min-h-[92vh] h-[90vh] px-[5%] flex flex-col bg-[#E4E6ED] justify-start items-center font-body">
          <div className="w-full h-full max-w-[1440px]">
            <div className="h-auto font-heading text-primary-heading text-[3rem] md:text-[4rem] xl:text-[5rem] w-full text-left content-center">
              <h1>Change Check-in</h1>
              <h1>and Check-out Date</h1>
            </div>
            <div className="w-full h-full md:h-auto py-[5%] flex flex-col justify-center items-center md:justify-center md:items-center md:py-[2rem]">
              {bookingData.map((item) => {
                return (
                  <>
                    <div className="w-full h-full flex flex-col md: justify-between md:flex-row border-b border-gray-300 mb-[1.5rem]">
                      <div className="w-full md:w-[45%] h-[50%] md:h-[400px]">
                        <div
                          className="size-full md:h-[90%] bg-center bg-cover md:rounded-lg bg-gray-300"
                          style={{
                            backgroundImage: `url(${item.main_image})`,
                          }}
                        ></div>
                      </div>

                      <div className="h-auto md:h-full w-full md:w-[50%]">
                        <div className="py-[5%] size-full flex flex-col md:w-full md:h-full md:justify-start gap-[1rem] md:gap-[2rem]">
                          <div className="w-full flex flex-col xl:flex-row xl:justify-between  xl:items-center gap-[1rem] md:gap-0">
                            <h2 className="text-[1.5rem] md:text-[2rem] font-semibold">
                              {item.type_name}
                            </h2>
                            <p className="text-gray-700">
                              Booking date: {dateFormatter(item.created_at)}
                            </p>
                          </div>

                          <div className="w-full h-auto md:mb-[1rem]">
                            {" "}
                            <p className="text-gray-800 font-semibold mb-2">
                              Original Date
                            </p>
                            <span className="text-gray-700 font-normal">
                              {dateFormatter(item.check_in)} -{" "}
                            </span>
                            <span className="text-gray-700 font-normal">
                              {dateFormatter(item.check_out)}
                            </span>
                          </div>
                          <div className="w-full h-auto md:mb-[1rem]">
                            <p className="text-gray-800 font-semibold mb-[1rem]">
                              Change Date
                            </p>
                            <div className="change-chk-in&out-date-picker flex flex-col lg:flex-row md:justify-around md:gap-[1rem]">
                              <div className="w-full">
                                <p className="p-1">Check In</p>
                                <Popover>
                                  <PopoverTrigger asChild>
                                    <Button
                                      variant={"outline"}
                                      className="flex flex-row justify-between w-full text-[1rem]"
                                    >
                                      {newCheckInDate ? (
                                        dateFormatter(newCheckInDate)
                                      ) : (
                                        <span className="text-[1rem]">
                                          {dateFormatter(item.check_in)}
                                        </span>
                                      )}
                                      <CalendarIcon />
                                    </Button>
                                  </PopoverTrigger>
                                  <PopoverContent className="w-auto p-0">
                                    <Calendar
                                      mode="single"
                                      fromDate={addDays(new Date(), 1)}
                                      selected={newCheckInDate}
                                      onSelect={setNewCheckInDate}
                                      initialFocus
                                    />
                                  </PopoverContent>
                                </Popover>
                              </div>
                              <div className="hidden lg:block md:self-center">
                                {" "}
                                -{" "}
                              </div>
                              <div className="w-full">
                                <p className="p-1">Check Out</p>
                                <Popover>
                                  <PopoverTrigger asChild>
                                    <Button
                                      className="flex flex-row justify-between w-full max-[320px]:text-sm text-base"
                                      variant={"outline"}
                                    >
                                      {newCheckOutDate ? (
                                        dateFormatter(newCheckOutDate)
                                      ) : (
                                        <span className="max-[320px]:text-sm text-base">
                                          {dateFormatter(item.check_out)}
                                        </span>
                                      )}
                                      <CalendarIcon />
                                    </Button>
                                  </PopoverTrigger>
                                  <PopoverContent className="w-auto p-0">
                                    <Calendar
                                      mode="single"
                                      fromDate={addDays(
                                        new Date(),
                                        dateDifference(checkIn, checkOut) + 1
                                      )}
                                      selected={newCheckOutDate}
                                      onSelect={setNewCheckOutDate}
                                      initialFocus
                                    />
                                  </PopoverContent>
                                </Popover>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="w-full flex flex-col md:flex-row md:justify-between">
                      <button
                        className="text-orange-500 max-md:order-last max-md:mt-5 ml-1"
                        onClick={() => window.history.back()}
                      >
                        Back
                      </button>
                      <Button onClick={toggleModal}>Confirm Change Date</Button>
                      <ConfirmModal
                        show={showModal}
                        handleClose={toggleModal}
                      />
                    </div>
                  </>
                );
              })}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
