import {
  serveUsers,
  serveOneUser,
  createUserService,
  serveUserUpdate,
  serveUserDelete,
} from "./users.service";

import { TIUsers } from "../drizzle/schema";
import { Context } from "hono";
export async function getUsers(c: Context) {
  try {
    const users = await serveUsers();
    if (users === null) {
      return c.json({ error: "Server error" }, 500);
    }
    if (users?.length === 0) {
      return c.json({ message: "No user registered" });
    }
    return c.json(users);
  } catch (error) {
    return c.json({ error }, 404);
  }
}

export async function getOneUser(c: Context) {
  try {
    const id: number = Number(c.req.param("id"));
    const user = await serveOneUser(id);
    if (user === null) {
      return c.json({ error: "Server Error" }, 500);
    }
    if (user?.length === 0) {
      return c.json({ error: "User does not exist" }, 404);
    }
    return c.json(user);
  } catch (error) {
    return c.json({ error }, 404);
  }
}

export async function createUser(c: Context) {
  const user = await c.req.json();
  try {
    const created = await createUserService(user);
    if (created === null) {
      return c.json({ error: "Server error" }, 500);
    }
    return c.json(created);
  } catch (error) {
    return c.json({ error }, 404);
  }
}

export async function updateUser(c: Context) {
  const id = Number(c.req.param("id"));
  const userUpdates = await c.req.json();
  try {
    const update = await serveUserUpdate(userUpdates, id);
    if (update === null) {
      return c.json({ error: "Server error" }, 500);
    }
    if (update?.length === 0) {
      return c.json({ error: "User does not exist" }, 404);
    }
    return c.json(update);
  } catch (error) {
    return c.json({ error }, 404);
  }
}

export async function deleteUser(c: Context) {
  const id = Number(c.req.param("id"));
  try {
    const deleted = await serveUserDelete(id);
    if (deleted === null) {
      return c.json({ error: "Server error" }, 500);
    }
    if (deleted?.length === 0) {
      return c.json({ error: "User does not exist" }, 404);
    }
    return c.json(deleted);
  } catch (error) {
    return c.json({ error }, 404);
  }
}

