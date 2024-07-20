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

  const getBookings = await c.req.json();
  console.log(getBookings);

  const vehiclesToBePaid = getBookings.map((booking: any) => ({
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
    success_url: `${process.env.BASE_URL}/success` as string,
    cancel_url: `${process.env.BASE_URL}/failed`,
  });
  return c.json({ sessionId: session.id });
}
