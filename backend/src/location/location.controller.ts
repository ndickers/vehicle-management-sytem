import {
  servelocation,
  serveOneLocation,
  createLocationService,
  serveLocationUpdate,
  serveLocationDelete,
} from "./location.service";
import { TILocation } from "../drizzle/schema";
import { Context } from "hono";
export async function getLocation(c: Context) {
  try {
    const location = await servelocation();
    if (location === null) {
      return c.json({ error: "Server error" }, 500);
    }
    if (location?.length === 0) {
      return c.json({ message: "No location registered" });
    }
    return c.json(location);
  } catch (error) {
    return c.json({ error }, 404);
  }
}
export async function getOneLocation(c: Context) {
  try {
    const id: number = Number(c.req.param("id"));
    const vehicle = await serveOneLocation(id);
    if (vehicle === null) {
      return c.json({ error: "Server Error" }, 500);
    }
    if (vehicle?.length === 0) {
      return c.json({ error: "Location does not exist" }, 404);
    }
    return c.json(vehicle);
  } catch (error) {
    return c.json({ error }, 404);
  }
}

export async function createLocation(c: Context) {
  const location = await c.req.json();
  try {
    const created = await createLocationService(location);
    if (created === null) {
      return c.json({ error: "Server error" }, 500);
    }
    return c.json(created);
  } catch (error) {
    return c.json({ error }, 404);
  }
}

export async function updateLocation(c: Context) {
  const id = Number(c.req.param("id"));
  const locationUpdates = await c.req.json();
  try {
    const update = await serveLocationUpdate(locationUpdates, id);
    if (update === null) {
      return c.json({ error: "Server error" }, 500);
    }
    if (update?.length === 0) {
      return c.json({ error: "Location does not exist" }, 404);
    }
    return c.json(update);
  } catch (error) {
    return c.json({ error }, 404);
  }
}

export async function deleteLocation(c: Context) {
  const id = Number(c.req.param("id"));
  try {
    const deleted = await serveLocationDelete(id);
    if (deleted === null) {
      return c.json({ error: "Server error" }, 500);
    }
    if (deleted?.length === 0) {
      return c.json({ error: "Location does not exist" }, 404);
    }
    return c.json(deleted);
  } catch (error) {
    return c.json({ error }, 404);
  }
}
