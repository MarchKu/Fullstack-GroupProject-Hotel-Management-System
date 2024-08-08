"use client";
import CheckoutPage from "../CheckoutPage";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useEffect, useState } from "react";
import { useBookingContext } from "@/contexts/booking";

if (process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY === undefined) {
  throw new Error("NEXT_PUBLIC_STRIPE_PUBLIC_KEY is not defined");
}
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

export function Payment({ paymentUpdate, username }) {
  const { totalPrice, bookingData } = useBookingContext();

  if (bookingData === null) {
    return <h1>Loading...</h1>;
  }

  return (
    <main className="w-full mx-auto lg:px-12 xl:px-10 mb-8  text-white text-center  rounded-md">
      <Elements
        stripe={stripePromise}
        options={{
          mode: "payment",
          amount: parseInt(totalPrice, 10),
          currency: "thb",
        }}
      >
        <CheckoutPage
          paymentUpdate={paymentUpdate}
          amount={parseInt(totalPrice, 10)}
          billId={bookingData.bill_id}
          bookingId={bookingData.booking_id}
          username={username}
        />
      </Elements>
    </main>
  );
}
