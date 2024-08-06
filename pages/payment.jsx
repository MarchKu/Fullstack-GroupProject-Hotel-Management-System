"use client";

import CheckoutPage from "@/components/CheckoutPage";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useEffect, useState } from "react";
import { useBookingContext } from "@/contexts/booking";
import axios from "axios";

if (process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY === undefined) {
  throw new Error("NEXT_PUBLIC_STRIPE_PUBLIC_KEY is not defined");
}
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

export default function Home() {
  const [billData, setBillData] = useState(null);

  useEffect(() => {
    const fetchBillData = async () => {
      const res = await axios.get(`/api/bills?bill_id=23`);
      setBillData(res.data);
    };
    fetchBillData();
  }, []);

  useEffect(() => {
    console.log("billData", billData);
  }, [billData]);

  if (billData === null) {
    return <h1>Loading...</h1>;
  }

  return (
    <main className="max-w-6xl mx-auto p-10 text-white text-center border m-10 rounded-md bg-gradient-to-tr from-blue-500 to-purple-500">
      <div className="mb-10">
        <h1 className="text-4xl font-extrabold mb-2">Sellers</h1>
        <h2 className="text-2xl">
          has requested
          <span className="font-bold">
            {parseInt(billData.total_price, 10)} THB
          </span>
        </h2>
      </div>

      <Elements
        stripe={stripePromise}
        options={{
          mode: "payment",
          amount: parseInt(billData.total_price, 10),
          currency: "thb",
        }}
      >
        <CheckoutPage
          amount={parseInt(billData.total_price, 10)}
          billId={billData.bill_id}
        />
      </Elements>
    </main>
  );
}
