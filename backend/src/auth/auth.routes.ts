import { z } from "zod";
import { zValidator } from "@hono/zod-validator";
import { Hono, Context } from "hono";
import { validateInput } from "../middleware/validate";
import {
  registerUser,
  loginUser,
  confirmRegistration,
  resetPassword,
  setPassword,
} from "./auth.controller";

export const authRoutes = new Hono();

const schema = z.object({
  fullname: z.string(),
  email: z.string().email(),
  phone: z.string(),
  address: z.string(),
  role: z.string(),
  password: z.string(),
});

const schema2 = z.object({
  email: z.string().email(),
  role: z.string(),
  password: z.string(),
});

authRoutes.post(
  "/register",
  zValidator("json", schema, validateInput),
  registerUser
);

authRoutes.post(
  "/login",
  zValidator("json", schema2, validateInput),
  loginUser
);

authRoutes.post("/reset-password", resetPassword);

authRoutes.post("/confirm-registration", confirmRegistration);

authRoutes.put("new-password", setPassword);
