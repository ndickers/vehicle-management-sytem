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
import { authorizeAll } from "../middleware/authorization";
export const bookingRoutes = new Hono();

const schema = z.object({
  userId: z.number(),
  vehicleId: z.number(),
  locationId: z.number(),
  returnDate: z.string().date(),
  totalAmount: z.number().positive(),
});

bookingRoutes.get("/bookings", getBookings);
bookingRoutes.get("/bookings/:id",authorizeAll , getOneBooking);

bookingRoutes.post(
  "/bookings",
  zValidator("json", schema, validateInput),authorizeAll,
  createBooking
);

bookingRoutes.put("/bookings/:id", authorizeAll,updateBooking);
bookingRoutes.delete("/bookings/:id",authorizeAll, deleteBooking);
