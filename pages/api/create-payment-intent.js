// import { NextRequest, NextResponse } from "next/server";
import stripe from "stripe";
import connectionPool from "@/utils/connectionPool/db";

const stripeInstance = stripe(process.env.STRIPE_SECRET_KEY);

export default async function POST(req, res) {
  try {
    const { amount, billId } = await req.body;

    const paymentIntent = await stripeInstance.paymentIntents.create({
      amount: amount,
      currency: "THB",
      automatic_payment_methods: { enabled: true },
    });

    const result = await connectionPool.query(
      `
      UPDATE bills
      SET payment_intent_id = $1
      WHERE bill_id = $2
      RETURNING *
      `,
      [paymentIntent.id, billId]
    );

    console.log("updated session_id:", result.rows[0]);

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
