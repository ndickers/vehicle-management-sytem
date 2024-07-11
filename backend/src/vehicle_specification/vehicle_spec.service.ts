import db from "../drizzle/db";
import { eq } from "drizzle-orm";
import { TSVehicleSpec,TIVehicleSpec, vehicleSpec } from "../drizzle/schema";

export async function serveVehicleSpec(): Promise<TSVehicleSpec[] | null> {
  return await db.query.vehicleSpec.findMany({
    with: {
      vehicle: true,
    },
  });
}

export async function serveOneVehicleSpec(
  id: number
): Promise<TSVehicleSpec[] | null> {
  return await db.query.vehicleSpec.findMany({
    where: eq(vehicleSpec.id, id),
    with: {
      vehicle: true,
    },
  });
}
export async function createVehicleSpecService(
  vehicleSpecDetails: TIVehicleSpec
): Promise<TSVehicleSpec[] | null> {
  return await db.insert(vehicleSpec).values(vehicleSpecDetails).returning({
    id: vehicleSpec.id,
    manufacturer: vehicleSpec.manufacturer,
    model: vehicleSpec.model,
    year: vehicleSpec.year,
    fuelType: vehicleSpec.fuelType,
    engineCapacity: vehicleSpec.engineCapacity,
    transmission: vehicleSpec.transmission,
    seatingCapacity: vehicleSpec.seatingCapacity,
    color: vehicleSpec.color,
    features: vehicleSpec.features,
  });
}

export async function serveVehicleSpecUpdate(
  updateDetails: TIVehicleSpec,
  id: number
) {
  return await db
    .update(vehicleSpec)
    .set(updateDetails)
    .where(eq(vehicleSpec.id, id))
    .returning({
      id: vehicleSpec.id,
      manufacturer: vehicleSpec.manufacturer,
      model: vehicleSpec.model,
      year: vehicleSpec.year,
      fuelType: vehicleSpec.fuelType,
      engineCapacity: vehicleSpec.engineCapacity,
      transmission: vehicleSpec.transmission,
      seatingCapacity: vehicleSpec.seatingCapacity,
      color: vehicleSpec.color,
      features: vehicleSpec.features,
    });
}
export async function serveVehicleSpecDelete(id: number) {
  return await db
    .delete(vehicleSpec)
    .where(eq(vehicleSpec.id, id))
    .returning({ vehicleSpecId: vehicleSpec.id });
}
