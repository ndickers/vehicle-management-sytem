import db from "../drizzle/db";
import { eq } from "drizzle-orm";
import {
  TSCustomerSupport,
  TICustomerSupport,
  TSUsers,
  customerSupportTicket,
} from "../drizzle/schema";
type TCustomer = Omit<TSCustomerSupport, "createdAt" | "updatedAt" | "userId">;
type TBaseSupport = Omit<TSCustomerSupport, "userId">;
export async function serveCustomerSupport(): Promise<TBaseSupport[] | null> {
  return await db.query.customerSupportTicket.findMany({
    columns: {
      userId: false,
    },
    with: {
      user: true,
    },
  });
}

export async function serveOneCustomerSupport(
  id: number
): Promise<TBaseSupport[] | null> {
  return await db.query.customerSupportTicket.findMany({
    where: eq(customerSupportTicket.userId, id),
    columns: {
      userId: false,
    },
    with: {
      user: true,
    },
  });
}

export async function createCustomerSupportService(
  ticketDetails: TICustomerSupport
): Promise<TCustomer[] | null> {
  return await db
    .insert(customerSupportTicket)
    .values(ticketDetails)
    .returning({
      id: customerSupportTicket.id,
      subject: customerSupportTicket.subject,
      description: customerSupportTicket.description,
      status: customerSupportTicket.status,
    });
}

export async function serveCustomerSupportUpdate(
  updateDetails: TICustomerSupport,
  id: number
) {
  return await db
    .update(customerSupportTicket)
    .set(updateDetails)
    .where(eq(customerSupportTicket.id, id))
    .returning({
      id: customerSupportTicket.id,
      subject: customerSupportTicket.subject,
      description: customerSupportTicket.description,
      status: customerSupportTicket.status,
    });
}
export async function serveCustomerSupportDelete(id: number) {
  return await db
    .delete(customerSupportTicket)
    .where(eq(customerSupportTicket.id, id))
    .returning({ customerTicketId: customerSupportTicket.id });
}
