import db from "../drizzle/db";
import { eq } from "drizzle-orm";
import { TSVehicles, TIVehicles, vehicles } from "../drizzle/schema";
type TVehicles = Omit<TSVehicles, "vehicleSpecId">;

export async function serveVehicles(): Promise<TSVehicles[] | null> {
  return await db.query.vehicles.findMany({
    with: {
      vehicle_specification: true,
      booking: {
        columns: { locationId: false, vehicleId: false, userId: false },
      },
      fleet_management: true,
    },
  });
}

export async function serveOneVehicle(
  id: number
): Promise<TSVehicles[] | null> {
  return await db.query.vehicles.findMany({
    where: eq(vehicles.id, id),
    with: {
      vehicle_specification: true,
      booking: {
        columns: { locationId: false, vehicleId: false, userId: false },
      },
      fleet_management: true,
    },
  });
}

export async function createVehicleService(
  vehicleDetails: TIVehicles
): Promise<TVehicles[] | null> {
  return await db.insert(vehicles).values(vehicleDetails).returning({
    id: vehicles.id,
    rentRate: vehicles.rentRate,
    image: vehicles.image,
    availability: vehicles.availability,
    createdAt: vehicles.createdAt,
    updatedAt: vehicles.updatedAt,
  });
}

export async function serveVehicleUpdate(
  updateDetails: TIVehicles,
  id: number
) {
  return await db
    .update(vehicles)
    .set(updateDetails)
    .where(eq(vehicles.id, id))
    .returning({
      id: vehicles.id,
      rentRate: vehicles.rentRate,
      availability: vehicles.availability,
    });
}
export async function serveVehicleDelete(id: number) {
  return await db
    .delete(vehicles)
    .where(eq(vehicles.id, id))
    .returning({ vehicleId: vehicles.id });
}
