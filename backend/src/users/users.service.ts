import db from "../drizzle/db";
import { eq } from "drizzle-orm";
import { TSUsers, TIUsers, users } from "../drizzle/schema";



export async function serveUsers(): Promise<TSUsers[] | null> {
  return await db.query.users.findMany({
    with: {
      bookings: {
        columns: { locationId: false, vehicleId: false, userId: false },
        with: {
          vehicles: {
            with: {
              vehicle_specification: {
                columns: {
                  vehicleId: false,
                },
              },
            },
          },
        },
      },
      customerSupportTickets: {
        columns: { userId: false },
      },
    },
  });
}

export async function serveOneUser(id: number): Promise<TSUsers[] | null> {
  return await db.query.users.findMany({
    where: eq(users.id, id),
    with: {
      bookings: {
        columns: { locationId: false, vehicleId: false, userId: false },
        with: {
          vehicles: {
            with: {
              vehicle_specification: {
                columns: { vehicleId: false },
              },
            },
          },
        },
      },
      customerSupportTickets: {
        columns: { userId: false },
      },
    },
  });
}

export async function createUserService(
  userDetails: TIUsers
): Promise<TSUsers[] | null> {
  return await db.insert(users).values(userDetails).returning({
    id: users.id,
    fullname: users.fullname,
    email: users.email,
    phone: users.phone,
    address: users.address,
    role: users.role,
    createdAt: users.createdAt,
    updatedAt: users.updatedAt,
  });
}

export async function serveUserUpdate(updateDetails: TIUsers, id: number) {
  return await db
    .update(users)
    .set(updateDetails)
    .where(eq(users.id, id))
    .returning({ users });
}

export async function serveUserDelete(id: number) {
  return await db
    .delete(users)
    .where(eq(users.id, id))
    .returning({ userId: users.id });
}
