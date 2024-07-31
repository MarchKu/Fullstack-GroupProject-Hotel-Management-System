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
        `http://localhost:3000/api/booking/${bookingId}`
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
      await axios.put(`http://localhost:3000/api/booking/${bookingId}`, {
        check_in: dateFormatter(newCheckInDate),
        check_out: dateFormatter(newCheckOutDate),
      });
      toastr["success"]("Change check-in and check-out date successfully");
      setTimeout(function () {
        window.location.replace("/booking/booking-history");
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
            <button
              className="border-primary border-[1px] rounded-md text-primary px-5 text-sm"
              onClick={handleClose}
            >
              No, I don't
            </button>
            <Button onClick={() => changeBookingDataById(bookingId)}>
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
      <div className="bg-[#F7F7FB]">
        {" "}
        <div className="flex flex-col mx-[7%] xl:mx-[10%] pt-10 md:pt-16 pb-5 md:pb-10 lg:pb-20 justify-center">
          {" "}
          <header className="w-[75%] md:w-[60%] lg:w-[68%] xl:w-[60%] text-primary-heading font-medium font-serif text-3xl leading-snug md:text-6xl md:leading-snug">
            <span>Change </span>
            <span>Check-in and </span>
            <span className="whitespace-nowrap">Check-out Date</span>
          </header>
          <div>
            {isLoading ? (
              <p>Loading...</p>
            ) : isError ? (
              <p>Error</p>
            ) : (
              bookingData.map((item) => {
                return (
                  <>
                    <div className="mt-16 flex flex-col lg:flex-row gap-12">
                      <img
                        src={item.main_image}
                        alt="room image"
                        className="lg:w-[50%] lg:h-[210px] rounded-sm"
                      />
                      <div className="w-full flex flex-col gap-5">
                        <div className="flex flex-col items-start md:flex-row md:justify-between md:items-center">
                          <h2 className="text-3xl font-semibold">
                            {item.type_name}
                          </h2>
                          <p className="text-gray-600 font-normal">
                            Booking date: {dateFormatter(item.created_at)}
                          </p>
                        </div>
                        <div>
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
                        <div className="bg-white p-2 md:p-2 xl:p-5">
                          <p className="text-gray-800 font-semibold mb-5">
                            Change Date
                          </p>
                          <div className="change-chk-in&out-date-picker flex flex-col md:flex-row md:justify-around md:gap-5">
                            <div className="w-full">
                              <p className="p-1">Check In</p>
                              <Popover>
                                <PopoverTrigger asChild>
                                  <Button
                                    variant={"outline"}
                                    className="flex flex-row justify-between w-full max-[320px]:text-sm text-base"
                                  >
                                    {newCheckInDate ? (
                                      dateFormatter(newCheckInDate)
                                    ) : (
                                      <span className="max-[320px]:text-sm text-base">
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
                            <div className="hidden md:block md:self-center">
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
                    <div className="button flex flex-col md:flex-row md:justify-between mt-5">
                      <button
                        className="text-primary font-semibold max-md:order-last max-md:mt-5 ml-1"
                        onClick={() =>
                          window.location.replace("/booking/booking-history")
                        }
                      >
                        Cancel
                      </button>
                      <Button onClick={toggleModal}>Confirm Change Date</Button>
                      <ConfirmModal
                        show={showModal}
                        handleClose={toggleModal}
                      />
                    </div>
                  </>
                );
              })
            )}
          </div>
        </div>
      </div>
    </>
  );
}
