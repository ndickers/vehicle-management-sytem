import Stripe from "stripe";
import {
  createPaymentService,
  getAllPaymentService,
  getOnePaymentService,
  getUserbooking,
  servePaymentDelete,
} from "./payment.service";
import "dotenv/config";
import { Context } from "hono";
const stripe = new Stripe(process.env.STRIPE_KEY as string);

export async function getAllPayment(c: Context) {
  try {
    const payments = await getAllPaymentService();
    if (payments === null) {
      return c.json({ error: "Server error" }, 500);
    }
    if (payments?.length === 0) {
      return c.json({ error: "No payments registered" }, 500);
    }
    return c.json(payments);
  } catch (error) {
    return c.json({ error }, 404);
  }
}

export async function getOnePayment(c: Context) {
  const id = Number(c.req.param("id"));
  try {
    const payments = await getOnePaymentService(id);
    if (payments === null) {
      return c.json({ error: "Server error" }, 500);
    }
    if (payments?.length === 0) {
      return c.json({ error: "No payment registered" }, 500);
    }
    return c.json(payments);
  } catch (error) {
    return c.json({ error }, 404);
  }
}

export async function deletePayment(c: Context) {
  const id = Number(c.req.param("id"));
  try {
    const deleted = await servePaymentDelete(id);
    if (deleted === null) {
      return c.json({ error: "Server error" }, 500);
    }
    if (deleted?.length === 0) {
      return c.json({ error: "Payment does not exist" }, 404);
    }
    return c.json(deleted);
  } catch (error) {
    return c.json({ error }, 404);
  }
}

export async function createCheckout(c: Context) {
  //  Create here items to be payed for

  //get with user id
  const userId = Number(c.req.param("id"));
  const getBookings = await getUserbooking(userId);

  const vehiclesToBePaid = getBookings.map((booking) => ({
    price_data: {
      currency: "usd",
      product_data: {
        name:
          booking?.vehicles?.vehicle_specification?.manufacturer ||
          "unknown vehicle",
      },
      unit_amount: Number(booking.totalAmount) * 100,
    },
    quantity: 1,
  }));

  const session = await stripe.checkout.sessions.create({
    line_items: vehiclesToBePaid,
    mode: "payment",
    success_url:
      `${process.env.BASE_URL}/success?session_id={CHECKOUT_SESSION_ID}` as string,
    cancel_url: `${process.env.BASE_URL}/cancel`,
  });

  console.log(session.url);
  return c.redirect(session.url as string);
}

export async function success(c: Context) {
  const sessionId: string | undefined = c.req.query("session_id");

  if (!sessionId) {
    return c.json({ error: "session_id is required" }, 400);
  }
  const lineItems = await stripe.checkout.sessions.listLineItems(sessionId);
  const session = await stripe.checkout.sessions.retrieve(sessionId);
  console.log(lineItems);

  // const createdTimestamp = session.created;
  // const createdDate = new Date(createdTimestamp * 1000);

  // const paymentDetails = {
  //   bookingId: 5,
  //   amount: session.amount_total && session.amount_total / 100,
  //   paymentStatus: session.status,
  //   paymentDate: createdDate.toISOString(),
  //   paymentMethod:
  //     session.payment_method_options &&
  //     Object.keys(session.payment_method_options)[0],
  //   transactionId: session.payment_intent,
  // };
  // await createPaymentService(paymentDetails);
  return c.text("Successfull payment");
}
export async function failed(c: Context) {
  const sessionId: string | undefined = c.req.query("session_id");
  if (!sessionId) {
    return c.json({ error: "session_id is required" }, 400);
  }

  const session = await stripe.checkout.sessions.retrieve(sessionId);

  const createdTimestamp = session.created;
  const createdDate = new Date(createdTimestamp * 1000);

  const paymentDetails = {
    bookingId: 5,
    amount: session.amount_total && session.amount_total / 100,
    paymentStatus: session.status,
    paymentDate: createdDate.toISOString(),
    paymentMethod:
      session.payment_method_options &&
      Object.keys(session.payment_method_options)[0],
    transactionId: session.payment_intent,
  };
  await createPaymentService(paymentDetails);
  return c.text("failed payment");
}
