// import { NextRequest, NextResponse } from "next/server";
import stripe from "stripe";

const stripeInstance = stripe(process.env.STRIPE_SECRET_KEY);

export default async function POST(req, res) {
  try {
    const { amount } = await req.body;

    const paymentIntent = await stripeInstance.paymentIntents.create({
      amount: amount,
      currency: "thb",
      automatic_payment_methods: { enabled: true },
    });

    return res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error("Internal Error:", error);
    // Handle other errors (e.g., network issues, parsing errors)
    return res.json(
      { error: `Internal Server Error: ${error}` },
      { status: 500 }
    );
  }
}
 