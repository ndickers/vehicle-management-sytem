"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBookings = getBookings;
exports.getOneBooking = getOneBooking;
exports.createBooking = createBooking;
exports.updateBooking = updateBooking;
exports.deleteBooking = deleteBooking;
const booking_service_1 = require("./booking.service");
async function getBookings(c) {
    try {
        const bookings = await (0, booking_service_1.serveBookings)();
        if (bookings === null) {
            return c.json({ error: "Server error" }, 500);
        }
        if (bookings?.length === 0) {
            return c.json({ message: "No booking registered" });
        }
        return c.json(bookings);
    }
    catch (error) {
        return c.json({ error }, 404);
    }
}
async function getOneBooking(c) {
    try {
        const id = Number(c.req.param("id"));
        const booking = await (0, booking_service_1.serveOneBooking)(id);
        if (booking === null) {
            return c.json({ error: "Server Error" }, 500);
        }
        if (booking?.length === 0) {
            return c.json({ error: "Booking does not exist" }, 404);
        }
        return c.json(booking);
    }
    catch (error) {
        return c.json({ error }, 404);
    }
}
async function createBooking(c) {
    const booking = await c.req.json();
    try {
        const created = await (0, booking_service_1.createBookingService)(booking);
        if (created === null) {
            return c.json({ error: "Server error" }, 500);
        }
        return c.json(created);
    }
    catch (error) {
        return c.json({ error }, 404);
    }
}
async function updateBooking(c) {
    const id = Number(c.req.param("id"));
    const bookingUpdates = await c.req.json();
    try {
        const update = await (0, booking_service_1.serveBookingUpdate)(bookingUpdates, id);
        if (update === null) {
            return c.json({ error: "Server error" }, 500);
        }
        if (update?.length === 0) {
            return c.json({ error: "Booking does not exist" }, 404);
        }
        return c.json(update);
    }
    catch (error) {
        return c.json({ error }, 404);
    }
}
async function deleteBooking(c) {
    const id = Number(c.req.param("id"));
    try {
        const deleted = await (0, booking_service_1.serveBookingDelete)(id);
        if (deleted === null) {
            return c.json({ error: "Server error" }, 500);
        }
        if (deleted?.length === 0) {
            return c.json({ error: "Booking does not exist" }, 404);
        }
        return c.json(deleted);
    }
    catch (error) {
        return c.json({ error }, 404);
    }
}
