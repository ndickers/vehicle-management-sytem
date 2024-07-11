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
import { validateInput } from "../middleware/validate";

export const vehicleRoutes = new Hono();

const schema = z.object({
  vehicleSpecId: z.number(),
  rentRate: z.number(),
  availability: z.boolean(),
});

vehicleRoutes.get("/vehicles", getVehicles);
vehicleRoutes.get("/vehicles/:id", getOneVehicle);

vehicleRoutes.post(
  "/vehicles",
  zValidator("json", schema, validateInput),
  createVehicle
);

vehicleRoutes.put("/vehicles/:id", updateVehicle);
vehicleRoutes.delete("/vehicles/:id", deleteVehicle);
