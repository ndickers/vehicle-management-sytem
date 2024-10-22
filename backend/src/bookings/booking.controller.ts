import {
  serveBookings,
  serveOneBooking,
  createBookingService,
  serveBookingUpdate,
  serveUserBooking,
  serveBookingDelete,
} from "./booking.service";
import { TIBooking } from "../drizzle/schema";
import { Context } from "hono";
export async function getBookings(c: Context) {
  try {
    const bookings = await serveBookings();
    if (bookings === null) {
      return c.json({ error: "Server error" }, 500);
    }
    if (bookings?.length === 0) {
      return c.json({ message: "No booking registered" });
    }
    return c.json(bookings);
  } catch (error) {
    return c.json({ error }, 404);
  }
}

export async function getOneBooking(c: Context) {
  try {
    const id: number = Number(c.req.param("id"));
    const booking = await serveOneBooking(id);
    if (booking === null) {
      return c.json({ error: "Server Error" }, 500);
    }
    if (booking?.length === 0) {
      return c.json({ error: "Booking does not exist" }, 404);
    }
    return c.json(booking);
  } catch (error) {
    return c.json({ error }, 404);
  }
}
export async function getUserBookings(c: Context) {
  try {
    const id: number = Number(c.req.param("id"));
    const booking = await serveUserBooking(id);
    if (booking === null) {
      return c.json({ error: "Server Error" }, 500);
    }
    if (booking?.length === 0) {
      return c.json({ error: "No Booking" }, 404);
    }
    return c.json(booking);
  } catch (error) {
    return c.json({ error }, 404);
  }
}

export async function createBooking(c: Context) {
  const booking = await c.req.json();
  try {
    const created = await createBookingService(booking);
    if (created === null) {
      return c.json({ error: "Server error" }, 500);
    }
    return c.json(created);
  } catch (error) {
    return c.json({ error }, 404);
  }
}

export async function updateBooking(c: Context) {
  const id = Number(c.req.param("id"));
  const updateBooking = await c.req.json();
  try {
    const update = await serveBookingUpdate(updateBooking, id);
    if (update === null) {
      return c.json({ error: "Server error" }, 500);
    }
    if (update?.length === 0) {
      return c.json({ error: "Booking does not exist" }, 404);
    }
    return c.json(update);
  } catch (error) {
    return c.json({ error }, 404);
  }
}

export async function deleteBooking(c: Context) {
  const id = Number(c.req.param("id"));
  try {
    const deleted = await serveBookingDelete(id);
    if (deleted === null) {
      return c.json({ error: "Server error" }, 500);
    }
    if (deleted?.length === 0) {
      return c.json({ error: "Booking does not exist" }, 404);
    }
    return c.json(deleted);
  } catch (error) {
    return c.json({ error }, 404);
  }
}
