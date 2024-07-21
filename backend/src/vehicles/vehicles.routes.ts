import { z } from "zod";
import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import {
  getVehicles,
  getOneVehicle,
  createVehicle,
  updateVehicle,
  deleteVehicle,
} from "./vehicles.controller";
import { adminAuth, authorizeAll } from "../middleware/authorization";
import { validateInput } from "../middleware/validate";

export const vehicleRoutes = new Hono();
const schema = z.object({
  rentRate: z.number(),
  availability: z.boolean(),
  image: z.string(),
});

vehicleRoutes.get("/vehicles", authorizeAll, getVehicles);
vehicleRoutes.get("/vehicles/:id", authorizeAll, getOneVehicle);

vehicleRoutes.post(
  "/vehicles",
  zValidator("json", schema, validateInput),
  adminAuth,
  createVehicle
);

vehicleRoutes.put("/vehicles/:id", adminAuth, updateVehicle);
vehicleRoutes.delete("/vehicles/:id", adminAuth, deleteVehicle);
