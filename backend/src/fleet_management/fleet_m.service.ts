import db from "../drizzle/db";
import { eq } from "drizzle-orm";
import { TSFleet, fleetManagement, TIFleet } from "../drizzle/schema";

export async function serveFleetManagement(): Promise<TSFleet[] | null> {
  return await db.query.fleetManagement.findMany({
    with: {
      vehicle: true,
    },
  });
}

export async function serveOneFleetManagement(
  id: number
): Promise<TSFleet[] | null> {
  return await db.query.fleetManagement.findMany({
    where: eq(fleetManagement.id, id),
    with: {
      vehicle: true,
    },
  });
}

type TFleet = Omit<TSFleet, "createdAt" | "updatedAt" | "vehicleId">;
export async function createFleetManagmentService(
  fleetDetails: TIFleet
): Promise<TFleet[] | null> {
  return await db.insert(fleetManagement).values(fleetDetails).returning({
    id: fleetManagement.id,
    acquisitionDate: fleetManagement.acquisitionDate,
    depreciationRate: fleetManagement.depreciationRate,
    currentValue: fleetManagement.currentValue,
    maintenanceCost: fleetManagement.maintenanceCost,
    status: fleetManagement.status,
  });
}

export async function serveFleetManagementUpdate(
  updateDetails: TIFleet,
  id: number
) {
  return await db
    .update(fleetManagement)
    .set(updateDetails)
    .where(eq(fleetManagement.id, id))
    .returning({
      id: fleetManagement.id,
      acquisitionDate: fleetManagement.acquisitionDate,
      depreciationRate: fleetManagement.depreciationRate,
      currentValue: fleetManagement.currentValue,
      maintenanceCost: fleetManagement.maintenanceCost,
      status: fleetManagement.status,
    });
}
export async function serveFleetManagementDelete(id: number) {
  return await db
    .delete(fleetManagement)
    .where(eq(fleetManagement.id, id))
    .returning({ fleetManagementId: fleetManagement.id });
}
