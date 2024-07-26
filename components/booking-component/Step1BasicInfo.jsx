import { Button } from "../ui/button";
import { BriefcaseBusiness } from "lucide-react";
import { useState, useEffect } from "react";
import { format, parse } from "date-fns";
import { useRouter } from "next/router";
import useUserProfile from "@/hooks/use-user-profile";

const Step1BasicInfo = ({ nextStep, prevStep }) => {
  const [bookingData, setBookingData] = useState();
  const [totalPrice, setTotalPrice] = useState();

  //Get username from query parameter*/
  const router = useRouter();
  const { username } = router.query;

  /*Get user profile */
  const { userData, getUserProfile, putUserProfile, isLoading, isError } =
    useUserProfile();

  useEffect(() => {
    const getBookingData = localStorage.getItem("bookingData");
    if (getBookingData) {
      setBookingData(JSON.parse(getBookingData));
    }
  }, []);

  useEffect(() => {
    if (username) {
      const fetchData = async () => {
        if (username) {
          await getUserProfile(username);
        }
      };
      fetchData();
    }
  }, [username]);

  useEffect(() => {
    totalRoomPrice();
  }, [bookingData]);

  const totalRoomPrice = () => {
    if (bookingData) {
      const totalRoomPrice =
        bookingData.number_of_night * Number(bookingData.room_price);
      setTotalPrice(totalRoomPrice);
    }
  };

  const setData = () => {
    const newBookingData = {
      ...bookingData,
      total_price: totalPrice,
    };
    localStorage.setItem("bookingData", JSON.stringify(newBookingData));
  };

  if (isLoading) {
    return <h1>Loading...</h1>;
  }
  if (isError) {
    return <h1>Error fetching data</h1>;
  }

  const handleNext = () => {
    setData();
    nextStep();
  };

  const handlePrev = () => {
    prevStep();
  };

  return userData ? (
    <>
      <div class="w-full pb-8 md:px-[5%] lg:px-[10%] md:pb-32">
        <header className="py-8 px-4 md:p-0 md:pt-24 border-b border-gray-300">
          <h1 class="text-4xl mb-6 font-serif md:text-[68px] font-medium text-green-800 tracking-tighter">
            Booking Room
          </h1>
          <div className=" font-body w-full h-[200px] md:h-[146px] flex">
            <div className="w-full flex flex-col gap-[5%] md:flex-row">
              <div className="flex items-center">
                <div className="w-16 h-16 rounded-sm bg-orange-500 flex items-center justify-center text-[28px] font-semibold text-white">
                  1
                </div>
                <span className="text-xl font-semibold ml-4 text-orange-500">
                  Basic Information
                </span>
              </div>
              <div className="flex items-center">
                <div className="w-16 h-16 rounded-sm bg-gray-200 flex items-center justify-center text-[28px] font-semibold text-gray-600">
                  2
                </div>
                <span className="text-xl font-semibold ml-4 text-gray-600">
                  Special Request
                </span>
              </div>
              <div className="flex items-center">
                <div className="w-16 h-16 rounded-sm bg-gray-200 flex items-center justify-center text-[28px] font-semibold text-gray-600">
                  3
                </div>
                <span className="text-xl font-semibold ml-4 text-gray-600">
                  Payment Method
                </span>
              </div>
            </div>
          </div>
        </header>

        <div className="w-full p-4 flex flex-col gap-8 md:mt-8  md:w-[45%] lg:w-[50%] xl:w-[60%] md:p-8 md:border  bg-white">
          <h3 className="text-xl font-semibold text-gray-600">
            Basic Information
          </h3>

          <div>
            <label
              htmlfor="full-name"
              className="block text-muted-foreground mb-1"
            >
              Full Name
            </label>
            <input
              type="text"
              id="full-name"
              value={userData.full_name}
              readOnly
              className="w-full p-2 border border-border rounded outline-none"
            />
          </div>
          <div>
            <label htmlfor="email" className="block text-muted-foreground mb-1">
              Email
            </label>
            <input
              type="text"
              id="email"
              value={userData.email}
              readOnly
              className="w-full p-2 border border-border rounded outline-none"
            />
          </div>
          <div>
            <label
              htmlfor="id-number"
              className="block text-muted-foreground mb-1"
            >
              ID Number
            </label>
            <input
              type="text"
              id="id-number"
              value={userData.id_number}
              readOnly
              className="w-full p-2 border border-border rounded outline-none"
            />
          </div>
          <div>
            <label
              htmlfor="date-of-birth"
              className="block text-muted-foreground mb-1"
            >
              Date of Birth
            </label>
            <input
              type="text"
              id="date-of-birth"
              value={format(userData.date_of_birth, "EEE, dd MMMM yyyy")}
              readOnly
              className="w-full p-2 border border-border rounded outline-none"
            />
          </div>
          <div>
            <label
              htmlfor="country"
              className="block text-muted-foreground mb-1"
            >
              Country
            </label>
            <input
              type="text"
              id="country"
              value={userData.country}
              readOnly
              className="w-full p-2 border border-border rounded outline-none"
            />
          </div>

          <div className=" md:pl-8 flex flex-col items-center md:absolute md:right-[5%] lg:right-[10%] xl:right-[15%] md:top-[445px]">
            <div className="w-[358px] h-[428px] rounded bg-green-700 text-white">
              <div className="w-full h-[62px] p-4  rounded bg-green-800 flex justify-between">
                <h3 className="font-semibold text-xl flex gap-4">
                  <BriefcaseBusiness className="text-gray-500" /> Booking Detail
                </h3>
                <p className="w-[56px] h-[25px] rounded text-orange-700 bg-orange-200 text-center ">
                  04:55
                </p>
              </div>
              <div className="w-full h-[366px] px-5 pt-5 flex flex-col justify-between">
                <div className="flex justify-between">
                  <div>
                    <p className="font-semibold">Check-in</p>
                    <p>After 2.00 PM</p>
                  </div>
                  <div>
                    <p className="font-semibold">Check-out</p>
                    <p>Before 12.00 PM</p>
                  </div>
                </div>
                <div>
                  <p>
                    {bookingData.check_in} - {bookingData.check_out}
                  </p>
                  <p>2 Guests</p>
                </div>
                <div className="flex justify-between">
                  <p>{bookingData.room_type}</p>
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
                <div className="flex justify-between border-t border-gray-600 h-[75px] items-center">
                  <p>Total</p>
                  <p className="text-xl font-semibold">
                    THB{" "}
                    {Number(totalPrice).toLocaleString("en-US", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </p>
                </div>
              </div>
            </div>
            <div className="w-[358px] h-[124px] py-6 pr-4 pl-10 mt-6 bg-gray-300 text-xs">
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
            <button className="w-[100px] text-orange-500" onClick={handlePrev}>
              Back
            </button>
            <Button className="w-[100px]" onClick={handleNext}>
              Next
            </Button>
          </div>
        </div>
      </div>
    </>
  ) : (
    <h1>Is loading...</h1>
  );
};

export default Step1BasicInfo;
