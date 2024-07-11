import { z } from "zod";
import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import {
  getUsers,
  getOneUser,
  createUser,
  updateUser,
  deleteUser,
} from "./users.controller";
import { userAuth } from "../middleware/authorization";
import { validateInput } from "../middleware/validate";

export const usersRoutes = new Hono();

const schema = z.object({
  fullname: z.string(),
  email: z.string().email(),
  phone: z.string(),
  address: z.string(),
  role: z.string(),
  password: z.string(),
});

usersRoutes.get("/users", getUsers);
usersRoutes.get("/users/:id", userAuth, getOneUser);

usersRoutes.post(
  "/users",
  zValidator("json", schema, validateInput),
  createUser
);

usersRoutes.put("/users/:id", updateUser);
usersRoutes.delete("/users/:id", deleteUser);
