import React from "react";
import Step1BasicInfo from "@/components/booking-component/Step1BasicInfo";
import Step2SpecialRequest from "@/components/booking-component/step2SpecialReques";
import Step3PaymentMethod from "@/components/booking-component/Step3PaymentMethod";
import Step4CompleteBooking from "@/components/booking-component/Step4CompleteBooking";
import NavbarComponent from "@/components/navigation-component/NavbarComponent";
import { useRouter } from "next/router";

const booking = () => {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);

  const [step, setStep] = React.useState(1);
  const nextStep = () => {
    // setBookingData({ ...bookingData, ...data });
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  React.useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(Boolean(token));
  }, []);

  switch (step) {
    case 1:
      return (
        <>
          <NavbarComponent isAuthenticated={isAuthenticated} />
          <Step1BasicInfo nextStep={nextStep} prevStep={prevStep} />
        </>
      );
    case 2:
      return (
        <>
          <NavbarComponent isAuthenticated={isAuthenticated} />
          <Step2SpecialRequest nextStep={nextStep} prevStep={prevStep} />
        </>
      );
    case 3:
      return (
        <>
          <NavbarComponent isAuthenticated={isAuthenticated} />
          <Step3PaymentMethod nextStep={nextStep} prevStep={prevStep} />
        </>
      );
    case 4:
      return (
        <>
          <NavbarComponent isAuthenticated={isAuthenticated} />
          <Step4CompleteBooking nextStep={nextStep} prevStep={prevStep} />
        </>
      );
    default:
      return <div>Unknown step</div>;
  }
};

export default booking;
