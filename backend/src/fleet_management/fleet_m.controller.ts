import {
  serveFleetManagement,
  serveOneFleetManagement,
  createFleetManagmentService,
  serveFleetManagementUpdate,
  serveFleetManagementDelete,
} from "./fleet_m.service";
import { TIFleet } from "../drizzle/schema";
import { Context } from "hono";
export async function getFleetManagement(c: Context) {
  try {
    const fleets = await serveFleetManagement();
    if (fleets === null) {
      return c.json({ error: "Server error" }, 500);
    }
    if (fleets?.length === 0) {
      return c.json({ message: "No fleet management registered" });
    }
    return c.json(fleets);
  } catch (error) {
    return c.json({ error }, 404);
  }
}
export async function getOneFleetManagement(c: Context) {
  try {
    const id: number = Number(c.req.param("id"));
    const fleet = await serveOneFleetManagement(id);
    if (fleet === null) {
      return c.json({ error: "Server Error" }, 500);
    }
    if (fleet?.length === 0) {
      return c.json({ error: "Fleet management does not exist" }, 404);
    }
    return c.json(fleet);
  } catch (error) {
    return c.json({ error }, 404);
  }
}

export async function createFleetManagement(c: Context) {
  const fleet = await c.req.json();
  try {
    const created = await createFleetManagmentService(fleet);
    if (created === null) {
      return c.json({ error: "Server error" }, 500);
    }
    return c.json(created);
  } catch (error) {
    return c.json({ error }, 404);
  }
}

export async function updateFleetManagement(c: Context) {
  const id = Number(c.req.param("id"));
  const fleetManagementUpdates = await c.req.json();
  try {
    const update = await serveFleetManagementUpdate(fleetManagementUpdates, id);
    if (update === null) {
      return c.json({ error: "Server error" }, 500);
    }
    if (update?.length === 0) {
      return c.json({ error: "Fleet management does not exist" }, 404);
    }
    return c.json(update);
  } catch (error) {
    return c.json({ error }, 404);
  }
}

export async function deleteFleetManagement(c: Context) {
  const id = Number(c.req.param("id"));
  try {
    const deleted = await serveFleetManagementDelete(id);
    if (deleted === null) {
      return c.json({ error: "Server error" }, 500);
    }
    if (deleted?.length === 0) {
      return c.json({ error: "Fleet management does not exist" }, 404);
    }
    return c.json(deleted);
  } catch (error) {
    return c.json({ error }, 404);
  }
}
