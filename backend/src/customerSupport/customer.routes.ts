import { z } from "zod";
import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import {
  getCustomerSupport,
  getOneCustomerSupport,
  createCustomerSupport,
  updateCustomerSupport,
  deleteCustomerSupport,
} from "./customer.controller";
import { validateInput } from "../middleware/validate";

export const customerSupportRoutes = new Hono();

const schema = z.object({
  userId: z.number(),
  subject: z.string(),
  description: z.string(),
  status: z.string(),
});

customerSupportRoutes.get("/customer-support", getCustomerSupport);
customerSupportRoutes.get("/customer-support/:id", getOneCustomerSupport);

customerSupportRoutes.post(
  "/customer-support",
  zValidator("json", schema, validateInput),
  createCustomerSupport
);

customerSupportRoutes.put("/customer-support/:id", updateCustomerSupport);
customerSupportRoutes.delete("/customer-support/:id", deleteCustomerSupport);
