"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paymentRoutes = void 0;
const hono_1 = require("hono");
const payment_controller_1 = require("./payment.controller");
exports.paymentRoutes = new hono_1.Hono();
exports.paymentRoutes.get("/payments", payment_controller_1.getAllPayment);
exports.paymentRoutes.get("/payments/:id", payment_controller_1.getOnePayment);
// paymentRoutes.post("/payments", createPayment);
exports.paymentRoutes.delete("/payments/:id", payment_controller_1.deletePayment);
//=========payment implementation=====
exports.paymentRoutes.post("/checkout", payment_controller_1.createCheckout);
exports.paymentRoutes.get("/success", payment_controller_1.success);
exports.paymentRoutes.get("/cancel", payment_controller_1.failed);
