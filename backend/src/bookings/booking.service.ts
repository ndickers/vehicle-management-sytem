import { vehicleSpec } from "./../drizzle/schema";
import db from "../drizzle/db";
import { eq, or } from "drizzle-orm";
import {
  TSBooking,
  TIBooking,
  bookings,
  TSUsers,
  TSVehicles,
  TSPayment,
  TSLocation,
} from "../drizzle/schema";

type TBaseBooking = Omit<TSBooking, "vehicleId" | "locationId" | "userId">;
type TBooking = TBaseBooking & {
  users: TSUsers;
  vehicles: TSVehicles;
  payment: TSPayment;
  location: TSLocation;
};

export async function serveBookings(): Promise<any> {
  return await db.query.bookings.findMany({
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
export async function serveUserBooking(id: number): Promise<any> {
  return await db.query.bookings.findMany({
    where: eq(bookings.userId, id),
    columns: {
      vehicleId: false,
      locationId: false,
      userId: false,
    },
    with: {
      vehicles: {
        with: {
          vehicle_specification: true,
        },
      },
    },
  });
}

export async function serveOneBooking(id: number): Promise<any> {
  return await db.query.bookings.findMany({
    where: eq(bookings.id, id),
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
export async function createBookingService(
  bookingDetails: TIBooking
): Promise<any> {
  return await db.insert(bookings).values(bookingDetails).returning({
    id: bookings.id,
    returnDate: bookings.returnDate,
    totalAmount: bookings.totalAmount,
    bookingStatus: bookings.bookingStatus,
  });
}

export async function serveBookingUpdate(
  updateDetails: { bookingStatus: string },
  id: number
) {
  return await db
    .update(bookings)
    .set(updateDetails)
    .where(or(eq(bookings.bookingStatus, "unpaid"), eq(bookings.userId, id)))
    .returning({
      id: bookings.id,
      returnDate: bookings.returnDate,
      totalAmount: bookings.totalAmount,
      bookingStatus: bookings.bookingStatus,
    });
}

export async function serveBookingDelete(id: number) {
  return await db
    .delete(bookings)
    .where(eq(bookings.id, id))
    .returning({ bookingId: bookings.id });
}
