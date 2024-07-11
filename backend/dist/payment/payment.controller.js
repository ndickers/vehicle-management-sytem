"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllPayment = getAllPayment;
exports.getOnePayment = getOnePayment;
exports.deletePayment = deletePayment;
exports.createCheckout = createCheckout;
exports.success = success;
exports.failed = failed;
const stripe_1 = __importDefault(require("stripe"));
const payment_service_1 = require("./payment.service");
require("dotenv/config");
const stripe = new stripe_1.default(process.env.STRIPE_KEY);
async function getAllPayment(c) {
    try {
        const payments = await (0, payment_service_1.getAllPaymentService)();
        if (payments === null) {
            return c.json({ error: "Server error" }, 500);
        }
        if (payments?.length === 0) {
            return c.json({ error: "No payments registered" }, 500);
        }
        return c.json(payments);
    }
    catch (error) {
        return c.json({ error }, 404);
    }
}
async function getOnePayment(c) {
    const id = Number(c.req.param("id"));
    try {
        const payments = await (0, payment_service_1.getOnePaymentService)(id);
        if (payments === null) {
            return c.json({ error: "Server error" }, 500);
        }
        if (payments?.length === 0) {
            return c.json({ error: "No payment registered" }, 500);
        }
        return c.json(payments);
    }
    catch (error) {
        return c.json({ error }, 404);
    }
}
async function deletePayment(c) {
    const id = Number(c.req.param("id"));
    try {
        const deleted = await (0, payment_service_1.servePaymentDelete)(id);
        if (deleted === null) {
            return c.json({ error: "Server error" }, 500);
        }
        if (deleted?.length === 0) {
            return c.json({ error: "Payment does not exist" }, 404);
        }
        return c.json(deleted);
    }
    catch (error) {
        return c.json({ error }, 404);
    }
}
async function createCheckout(c) {
    //  Create here items to be payed for
    const session = await stripe.checkout.sessions.create({
        line_items: [
            {
                price_data: {
                    currency: "usd",
                    product_data: {
                        name: "T-shirt",
                    },
                    unit_amount: 400 * 100,
                },
                quantity: 1,
            },
        ],
        mode: "payment",
        success_url: `${process.env.BASE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.BASE_URL}/cancel`,
    });
    console.log(session.url);
    return c.text("Hello");
}
async function success(c) {
    const sessionId = c.req.query("session_id");
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
        paymentMethod: session.payment_method_options &&
            Object.keys(session.payment_method_options)[0],
        transactionId: session.payment_intent,
    };
    await (0, payment_service_1.createPaymentService)(paymentDetails);
    return c.text("Successfull payment");
}
async function failed(c) {
    const sessionId = c.req.query("session_id");
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
        paymentMethod: session.payment_method_options &&
            Object.keys(session.payment_method_options)[0],
        transactionId: session.payment_intent,
    };
    await (0, payment_service_1.createPaymentService)(paymentDetails);
    return c.text("failed payment");
}
