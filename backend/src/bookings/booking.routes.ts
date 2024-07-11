import { z } from "zod";
import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import {
  getBookings,
  getOneBooking,
  createBooking,
  updateBooking,
  deleteBooking,
} from "./booking.controller";
import { validateInput } from "../middleware/validate";

export const bookingRoutes = new Hono();

const schema = z.object({
  userId: z.number(),
  vehicleId: z.number(),
  locationId: z.number(),
  returnDate: z.string().date(),
  totalAmount: z.number().positive(),
  bookingStatus: z.string(),
});

bookingRoutes.get("/bookings", getBookings);
bookingRoutes.get("/bookings/:id", getOneBooking);

bookingRoutes.post(
  "/bookings",
  zValidator("json", schema, validateInput),
  createBooking
);

bookingRoutes.put("/bookings/:id", updateBooking);
bookingRoutes.delete("/bookings/:id", deleteBooking);
