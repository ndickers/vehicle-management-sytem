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
import { authorizeAll, adminAuth, userAuth } from "../middleware/authorization";
export const customerSupportRoutes = new Hono();

const schema = z.object({
  userId: z.number(),
  subject: z.string(),
  description: z.string(),
});

customerSupportRoutes.get("/customer-support", adminAuth, getCustomerSupport);
customerSupportRoutes.get(
  "/customer-support/:id",
  authorizeAll,
  getOneCustomerSupport
);

customerSupportRoutes.post(
  "/customer-support",
  zValidator("json", schema, validateInput),
  userAuth,
  createCustomerSupport
);

customerSupportRoutes.put(
  "/customer-support/:id",
  authorizeAll,
  updateCustomerSupport
);
customerSupportRoutes.delete(
  "/customer-support/:id",
  authorizeAll,
  deleteCustomerSupport
);
