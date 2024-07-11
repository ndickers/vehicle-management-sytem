"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.serveBookings = serveBookings;
exports.serveOneBooking = serveOneBooking;
exports.createBookingService = createBookingService;
exports.serveBookingUpdate = serveBookingUpdate;
exports.serveBookingDelete = serveBookingDelete;
const db_1 = __importDefault(require("../drizzle/db"));
const drizzle_orm_1 = require("drizzle-orm");
const schema_1 = require("../drizzle/schema");
async function serveBookings() {
    return await db_1.default.query.bookings.findMany({
        columns: {
            vehicleId: false,
            locationId: false,
            userId: false,
        },
        with: {
            users: true,
            vehicles: true,
            payment: true,
            location: true,
        },
    });
}
async function serveOneBooking(id) {
    return await db_1.default.query.bookings.findMany({
        where: (0, drizzle_orm_1.eq)(schema_1.bookings.id, id),
        columns: {
            vehicleId: false,
            locationId: false,
            userId: false,
        },
        with: {
            users: true,
            vehicles: true,
            payment: true,
            location: true,
        },
    });
}
async function createBookingService(bookingDetails) {
    return await db_1.default.insert(schema_1.bookings).values(bookingDetails).returning({
        id: schema_1.bookings.id,
        returnDate: schema_1.bookings.returnDate,
        totalAmount: schema_1.bookings.totalAmount,
        bookingStatus: schema_1.bookings.bookingStatus,
    });
}
async function serveBookingUpdate(updateDetails, id) {
    return await db_1.default
        .update(schema_1.bookings)
        .set(updateDetails)
        .where((0, drizzle_orm_1.eq)(schema_1.bookings.id, id))
        .returning({
        id: schema_1.bookings.id,
        returnDate: schema_1.bookings.returnDate,
        totalAmount: schema_1.bookings.totalAmount,
        bookingStatus: schema_1.bookings.bookingStatus,
    });
}
async function serveBookingDelete(id) {
    return await db_1.default
        .delete(schema_1.bookings)
        .where((0, drizzle_orm_1.eq)(schema_1.bookings.id, id))
        .returning({ bookingId: schema_1.bookings.id });
}
