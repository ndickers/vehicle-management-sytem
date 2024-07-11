"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookingRoutes = void 0;
const zod_1 = require("zod");
const zod_validator_1 = require("@hono/zod-validator");
const hono_1 = require("hono");
const booking_controller_1 = require("./booking.controller");
const validate_1 = require("../middleware/validate");
exports.bookingRoutes = new hono_1.Hono();
const schema = zod_1.z.object({
    userId: zod_1.z.number(),
    vehicleId: zod_1.z.number(),
    locationId: zod_1.z.number(),
    returnDate: zod_1.z.string().date(),
    totalAmount: zod_1.z.number().positive(),
    bookingStatus: zod_1.z.string(),
});
exports.bookingRoutes.get("/bookings", booking_controller_1.getBookings);
exports.bookingRoutes.get("/bookings/:id", booking_controller_1.getOneBooking);
exports.bookingRoutes.post("/bookings", (0, zod_validator_1.zValidator)("json", schema, validate_1.validateInput), booking_controller_1.createBooking);
exports.bookingRoutes.put("/bookings/:id", booking_controller_1.updateBooking);
exports.bookingRoutes.delete("/bookings/:id", booking_controller_1.deleteBooking);
