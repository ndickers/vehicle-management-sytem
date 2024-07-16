import db from "../drizzle/db";
import { eq, and } from "drizzle-orm";
import { TSPayment, TIPayment, payments, bookings } from "../drizzle/schema";

export async function getAllPaymentService(): Promise<TSPayment[] | null> {
  return await db.query.payments.findMany();
}

export async function getOnePaymentService(
  id: number
): Promise<TSPayment[] | null> {
  return await db.query.payments.findMany({ where: eq(payments.id, id) });
}

export async function getUserbooking(id: number) {
  return await db.query.bookings.findMany({
    where: and(eq(bookings.userId, id), eq(bookings.bookingStatus, "unpaid")),
    with: {
      vehicles: {
        with: {
          vehicle_specification: true,
        },
      },
    },
  });
}

export async function servePaymentDelete(id: number) {
  return await db
    .delete(payments)
    .where(eq(payments.id, id))
    .returning({ paymentId: payments.id });
}

export async function createPaymentService(paymentDetail: any) {
  return await db.insert(payments).values(paymentDetail).returning({
    id: payments.id,
  });
}
