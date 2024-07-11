import { z } from "zod";
import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import {
  getFleetManagement,
  getOneFleetManagement,
  createFleetManagement,
  updateFleetManagement,
  deleteFleetManagement,
} from "./fleet_m.controller";
import { validateInput } from "../middleware/validate";

export const fleetManagementRoutes = new Hono();

const schema = z.object({
  vehicleId: z.number(),
  acquisitionDate: z.string().date(),
  depreciationRate: z.number(),
  currentValue: z.number(),
  maintenanceCost: z.number(),
  status: z.string(),
});

fleetManagementRoutes.get("/fleet-management", getFleetManagement);
fleetManagementRoutes.get("/fleet-management/:id", getOneFleetManagement);

fleetManagementRoutes.post(
  "/fleet-management",
  zValidator("json", schema, validateInput),
  createFleetManagement
);

fleetManagementRoutes.put("/fleet-management/:id", updateFleetManagement);
fleetManagementRoutes.delete("/fleet-management/:id", deleteFleetManagement);
