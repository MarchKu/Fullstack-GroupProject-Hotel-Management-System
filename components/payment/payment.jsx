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
    <main className="max-w-6xl mx-auto p-10 text-white text-center border m-10 rounded-md bg-gradient-to-tr from-blue-500 to-purple-500">
      <div className="mb-10">
        <h1 className="text-4xl font-extrabold mb-2">Sellers</h1>
        <h2 className="text-2xl">
          has requested
          <span className="font-bold"> {parseInt(totalPrice, 10)} THB</span>
        </h2>
      </div>

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
