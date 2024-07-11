import {
  serveCustomerSupport,
  serveOneCustomerSupport,
  createCustomerSupportService,
  serveCustomerSupportUpdate,
  serveCustomerSupportDelete,
} from "./customer.service";
import { TICustomerSupport } from "../drizzle/schema";
import { Context } from "hono";
export async function getCustomerSupport(c: Context) {
  try {
    const ticket = await serveCustomerSupport();
    if (ticket === null) {
      return c.json({ error: "Server error" }, 500);
    }
    if (ticket?.length === 0) {
      return c.json({ message: "No customer support ticket registered" });
    }
    return c.json(ticket);
  } catch (error) {
    return c.json({ error }, 404);
  }
}
export async function getOneCustomerSupport(c: Context) {
  try {
    const id: number = Number(c.req.param("id"));
    const ticket = await serveOneCustomerSupport(id);
    if (ticket === null) {
      return c.json({ error: "Server Error" }, 500);
    }
    if (ticket?.length === 0) {
      return c.json({ error: "Customer support ticket does not exist" }, 404);
    }
    return c.json(ticket);
  } catch (error) {
    return c.json({ error }, 404);
  }
}

export async function createCustomerSupport(c: Context) {
  const ticket = await c.req.json();
  try {
    const created = await createCustomerSupportService(ticket);
    if (created === null) {
      return c.json({ error: "Server error" }, 500);
    }
    return c.json(created);
  } catch (error) {
    return c.json({ error }, 404);
  }
}

export async function updateCustomerSupport(c: Context) {
  const id = Number(c.req.param("id"));
  const ticketUpdates = await c.req.json();
  try {
    const update = await serveCustomerSupportUpdate(ticketUpdates, id);
    if (update === null) {
      return c.json({ error: "Server error" }, 500);
    }
    if (update?.length === 0) {
      return c.json({ error: "Customer Support Ticket does not exist" }, 404);
    }
    return c.json(update);
  } catch (error) {
    return c.json({ error }, 404);
  }
}

export async function deleteCustomerSupport(c: Context) {
  const id = Number(c.req.param("id"));
  try {
    const deleted = await serveCustomerSupportDelete(id);
    if (deleted === null) {
      return c.json({ error: "Server error" }, 500);
    }
    if (deleted?.length === 0) {
      return c.json({ error: "Customer support ticket does not exist" }, 404);
    }
    return c.json(deleted);
  } catch (error) {
    return c.json({ error }, 404);
  }
}
