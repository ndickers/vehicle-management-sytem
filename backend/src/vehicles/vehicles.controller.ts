import {
  serveVehicles,
  serveOneVehicle,
  createVehicleService,
  serveVehicleUpdate,
  serveVehicleDelete,
} from "./vehicles.service";
import { TIBooking } from "../drizzle/schema";
import { Context } from "hono";
export async function getVehicles(c: Context) {
  try {
    const vehicles = await serveVehicles();
    if (vehicles === null) {
      return c.json({ error: "Server error" }, 500);
    }
    if (vehicles?.length === 0) {
      return c.json({ message: "No vehicle registered" });
    }
    return c.json({ data: vehicles });
  } catch (error) {
    return c.json({ error }, 404);
  }
}
export async function getOneVehicle(c: Context) {
  try {
    const id: number = Number(c.req.param("id"));
    const vehicle = await serveOneVehicle(id);
    if (vehicle === null) {
      return c.json({ error: "Server Error" }, 500);
    }
    if (vehicle?.length === 0) {
      return c.json({ error: "Vehicle does not exist" }, 404);
    }
    return c.json(vehicle);
  } catch (error) {
    return c.json({ error }, 404);
  }
}

export async function createVehicle(c: Context) {
  const vehicle = await c.req.json();

  try {
    const created = await createVehicleService(vehicle);
    if (created === null) {
      return c.json({ error: "Server error" }, 500);
    }
    return c.json(created);
  } catch (error) {
    return c.json({ error }, 404);
  }
}

export async function updateVehicle(c: Context) {
  const id = Number(c.req.param("id"));
  const vehicleUpdates = await c.req.json();
  try {
    const update = await serveVehicleUpdate(vehicleUpdates, id);
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

export async function deleteVehicle(c: Context) {
  const id = Number(c.req.param("id"));
  try {
    const deleted = await serveVehicleDelete(id);
    if (deleted === null) {
      return c.json({ error: "Server error" }, 500);
    }
    if (deleted?.length === 0) {
      return c.json({ error: "Vehicle does not exist" }, 404);
    }
    return c.json(deleted);
  } catch (error) {
    return c.json({ error }, 404);
  }
}
