"use client";
import Step1BasicInfo from "@/components/booking-component/Step1BasicInfo";
import Step2SpecialRequest from "@/components/booking-component/step2SpecialReques";
import Step3PaymentMethod from "@/components/booking-component/Step3PaymentMethod";
import Step4CompleteBooking from "@/components/booking-component/Step4CompleteBooking";
import NavbarComponent from "@/components/navigation-component/NavbarComponent";
import { useRouter } from "next/router";
import { useBookingContext } from "@/contexts/booking";
import { useState, useEffect, useCallback } from "react";
import AlertRoomIsBooked from "@/components/booking-component/AlertRoomIsBooked";

const Booking = () => {
  const [step, setStep] = useState(1);
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { getBookingData, bookingData, deleteUncompleteBooking, setTimeLeft } =
    useBookingContext();

  const { bookingID, bookingStep } = router.query;

  const redirectToSearchResult = useCallback(async () => {
    await deleteUncompleteBooking(bookingID);
    const searchQuery = localStorage.getItem("searchData");
    if (searchQuery) {
      const parsedData = JSON.parse(searchQuery);
      router.push({
        pathname: "/search-result",
        query: parsedData,
      });
    }
  }, [bookingID]);

  const setTimeLeftStart = useCallback(() => {
    setTimeLeft(300);
  }, []);

  const setTimeLeftFunction = useCallback(() => {
    setTimeLeft((prevTime) => {
      if (prevTime <= 1) {
        redirectToSearchResult();
        return 0;
      }
      return prevTime - 1;
    });
  }, []);

  // set timeout booking
  useEffect(() => {
    setTimeLeftStart();
    const interval = setInterval(() => {
      setTimeLeftFunction();
    }, 1000);

    return () => clearInterval(interval);
  }, [bookingID, setTimeLeftFunction, setTimeLeftStart]);

  useEffect(() => {
    setStep(Number(bookingStep));
    getBookingData(bookingID);
  }, [bookingStep, bookingID, getBookingData]);

  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1);
    } else {
      redirectToSearchResult();
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(Boolean(token));
  }, []);

  useEffect(() => {
    const handleRouteChange = (url) => {
      if (!url.startsWith("/booking")) {
        deleteUncompleteBooking(bookingID);
      }
    };

    router.events.on("routeChangeStart", handleRouteChange);

    return () => {
      router.events.off("routeChangeStart", handleRouteChange);
    };
  }, [router, bookingID, deleteUncompleteBooking]);

  switch (step) {
    case 1:
      return (
        <>
          <div className="w-screen flex justify-center">
            <Step1BasicInfo nextStep={nextStep} prevStep={prevStep} />
            <AlertRoomIsBooked />
          </div>
        </>
      );
    case 2:
      return bookingData ? (
        <>
          <div className="w-screen flex justify-center">
            <Step2SpecialRequest nextStep={nextStep} prevStep={prevStep} />
            <AlertRoomIsBooked />
          </div>
        </>
      ) : (
        ""
      );
    case 3:
      return (
        <>
          <div className="w-screen flex justify-center">
            <Step3PaymentMethod nextStep={nextStep} prevStep={prevStep} />
            <AlertRoomIsBooked />
          </div>
        </>
      );
    case 4:
      return bookingData ? (
        <>
          <Step4CompleteBooking nextStep={nextStep} prevStep={prevStep} />
        </>
      ) : (
        ""
      );
  }
};

export default Booking;
