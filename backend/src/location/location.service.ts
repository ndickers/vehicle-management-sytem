import db from "../drizzle/db";
import { eq } from "drizzle-orm";
import { TSLocation, TILocation, location } from "../drizzle/schema";
type TLocation = Omit<TSLocation, "createdAt" | "updatedAt">;
 
export async function servelocation(): Promise<TSLocation[] | null> {
  return await db.query.location.findMany({
    with: {
      booking: {
        columns: { locationId: false, vehicleId: false, userId: false },
      },
    },
  });
}

export async function serveOneLocation(
  id: number
): Promise<TSLocation[] | null> {
  return await db.query.location.findMany({
    where: eq(location.id, id),
    with: {
      booking: {
        columns: { locationId: false, vehicleId: false, userId: false },
      },
    },
  });
}
export async function createLocationService(
  locationDetails: TILocation
): Promise<TLocation[] | null> {
  return await db.insert(location).values(locationDetails).returning({
    id: location.id,
    name: location.name,
    address: location.address,
    phone: location.phone,
  });
}

export async function serveLocationUpdate(
  updateDetails: TILocation,
  id: number
) {
  return await db
    .update(location)
    .set(updateDetails)
    .where(eq(location.id, id))
    .returning({
      locationId: location.id,
      name: location.name,
      address: location.address,
      phone: location.phone,
    });
}
export async function serveLocationDelete(id: number) {
  return await db
    .delete(location)
    .where(eq(location.id, id))
    .returning({ locationId: location.id });
}
