import {
  serveVehicleSpec,
  serveOneVehicleSpec,
  createVehicleSpecService,
  serveVehicleSpecUpdate,
  serveVehicleSpecDelete,
} from "./vehicle_spec.service";
import { TIVehicleSpec } from "../drizzle/schema";
import { Context } from "hono";
export async function getVehicleSpec(c: Context) {
  try {
    const vehicleSpec = await serveVehicleSpec();
    if (vehicleSpec === null) {
      return c.json({ error: "Server error" }, 500);
    }
    if (vehicleSpec?.length === 0) {
      return c.json({ message: "No vehicle specification registered" });
    }
    return c.json(vehicleSpec);
  } catch (error) {
    return c.json({ error }, 404);
  }
}
export async function getOneVehicleSpec(c: Context) {
  try {
    const id: number = Number(c.req.param("id"));
    const vehicleSpec = await serveOneVehicleSpec(id);
    if (vehicleSpec === null) {
      return c.json({ error: "Server Error" }, 500);
    }
    if (vehicleSpec?.length === 0) {
      return c.json({ error: "Vehicle specification does not exist" }, 404);
    }
    return c.json(vehicleSpec);
  } catch (error) {
    return c.json({ error }, 404);
  }
}

export async function createVehicleSpec(c: Context) {
  const fleet = await c.req.json();
  try {
    const created = await createVehicleSpecService(fleet);
    if (created === null) {
      return c.json({ error: "Server error" }, 500);
    }
    return c.json(created);
  } catch (error) {
    return c.json({ error }, 404);
  }
}

export async function updateVehicleSpec(c: Context) {
  const id = Number(c.req.param("id"));
  const vehicleSpecUpdates = await c.req.json();
  try {
    const update = await serveVehicleSpecUpdate(vehicleSpecUpdates, id);
    if (update === null) {
      return c.json({ error: "Server error" }, 500);
    }
    if (update?.length === 0) {
      return c.json({ error: "Veehicle does not exist" }, 404);
    }
    return c.json(update);
  } catch (error) {
    return c.json({ error }, 404);
  }
}

export async function deleteVehicleSpec(c: Context) {
  const id = Number(c.req.param("id"));
  try {
    const deleted = await serveVehicleSpecDelete(id);
    if (deleted === null) {
      return c.json({ error: "Server error" }, 500);
    }
    if (deleted?.length === 0) {
      return c.json({ error: "Vehicle specification does not exist" }, 404);
    }
    return c.json(deleted);
  } catch (error) {
    return c.json({ error }, 404);
  }
}
