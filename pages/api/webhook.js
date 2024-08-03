// pages/api/webhook.js
import { buffer } from "micro";
import Stripe from "stripe"; // Import the Stripe class
import connectionPool from "@/utils/connectionPool/db";

// Initialize Stripe with your secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY); // Create a Stripe instance
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET; // Replace with your Stripe webhook secret

export const config = {
  api: {
    bodyParser: false, // Disable body parsing to handle raw payloads
  },
};

export default async function handler(req, res) {
  const sig = req.headers["stripe-signature"];

  let event;

  try {
    const buf = await buffer(req);
    event = stripe.webhooks.constructEvent(buf.toString(), sig, endpointSecret);
  } catch (err) {
    res.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

  console.log("event data:", event);

  // Handle the event
  switch (event.type) {
    case "payment_intent.succeeded":
      const paymentIntentSucceeded = event.data.object;
      // console.log("PaymentIntent succeeded:", paymentIntentSucceeded);
      // Handle the payment_intent.succeeded event
      break;
    // ... handle other event types
    case "charge.updated":
      const chargeUpdated = event.data.object;
      console.log("Charge updated:", chargeUpdated);
      const updatePayment = await connectionPool.query(
        `
        UPDATE bills
        SET is_paid = TRUE
        WHERE payment_intent_id = $1
        `,
        [chargeUpdated.payment_intent]
      );
      console.log("updated payment:", updatePayment);
      // Handle the charge.updated event
      break;
    case "payment_intent.created":
      const paymentIntentCreated = event.data.object;
      // console.log("PaymentIntent created:", paymentIntentCreated);
      // Handle the payment_intent.created event
      break;
    case "checkout.session.completed":
      const checkoutSession = event.data.object;
      const session_id = checkoutSession.id;
      const status = checkoutSession.status;
      console.log("checkout session completed:", checkoutSession);
      if (checkoutSession.status === "succeeded") {
        // const result = await connectionPool.query(
        //   `
        //     INSERT into booking (session_id, status)
        //     values ($1, $2)
        //     `,
        //   [session_id, status]
        // );
        console.log("checkout session succeeded: ", result);
      }
      // Fulfill the purchase...
      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  // Return a 200 response to acknowledge receipt of the event
  res.status(200).end();
}
