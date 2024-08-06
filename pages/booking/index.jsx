import Step1BasicInfo from "@/components/booking-component/Step1BasicInfo";
import Step2SpecialRequest from "@/components/booking-component/step2SpecialReques";
import Step3PaymentMethod from "@/components/booking-component/Step3PaymentMethod";
import Step4CompleteBooking from "@/components/booking-component/Step4CompleteBooking";
import NavbarComponent from "@/components/navigation-component/NavbarComponent";
import { useRouter } from "next/router";
import { useBookingContext } from "@/contexts/booking";
import { useState, useEffect } from "react";

const booking = () => {
  const [step, setStep] = useState(1);
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { getBookingData, bookingData, deleteUncompleteBooking, setTimeLeft } =
    useBookingContext();

  const { bookingID } = router.query;

  // set timeout booking
  useEffect(() => {
    setTimeLeft(1000);
    const interval = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(interval);
          deleteUncompleteBooking(bookingID);
          router.back();
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [bookingID]);

  useEffect(() => {
    getBookingData(bookingID);
  }, [bookingID]);

  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1);
    } else {
      router.push("/search-result");
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(Boolean(token));
  }, []);

  useEffect(() => {
    const handleRouteChange = () => {
      deleteUncompleteBooking(bookingID);
    };

    router.events.on("routeChangeStart", handleRouteChange);

    return () => {
      router.events.off("routeChangeStart", handleRouteChange);
    };
  }, [bookingID]);

  switch (step) {
    case 1:
      return bookingData ? (
        <>
          <NavbarComponent isAuthenticated={isAuthenticated} />
          <Step1BasicInfo nextStep={nextStep} prevStep={prevStep} />
        </>
      ) : (
        ""
      );
    case 2:
      return bookingData ? (
        <>
          <NavbarComponent isAuthenticated={isAuthenticated} />
          <Step2SpecialRequest nextStep={nextStep} prevStep={prevStep} />
        </>
      ) : (
        ""
      );
    case 3:
      return (
        <>
          <NavbarComponent isAuthenticated={isAuthenticated} />
          <Step3PaymentMethod nextStep={nextStep} prevStep={prevStep} />
        </>
      );
    case 4:
      return bookingData ? (
        <>
          <NavbarComponent isAuthenticated={isAuthenticated} />
          <Step4CompleteBooking nextStep={nextStep} prevStep={prevStep} />
        </>
      ) : (
        ""
      );
  }
};

export default booking;
