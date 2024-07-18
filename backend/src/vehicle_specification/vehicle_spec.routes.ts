import { z } from "zod";
import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import {
  getVehicleSpec,
  getOneVehicleSpec,
  createVehicleSpec,
  updateVehicleSpec,
  deleteVehicleSpec,
} from "./vehicle_spec.controller";
import { validateInput } from "../middleware/validate";

export const vehicleSpecRoutes = new Hono();

const schema = z.object({
  manufacturer: z.string(),
  model: z.string(),
  seatingCapacity: z.number(),
  year: z.number(),
  vehicleId: z.number(),
  fuelType: z.string(),
  engineCapacity: z.string(),
  transmission: z.string(),
  color: z.string(),
  features: z.string(),
});

vehicleSpecRoutes.get("/vehicle-specification", getVehicleSpec);
vehicleSpecRoutes.get("/vehicle-specification/:id", getOneVehicleSpec);

vehicleSpecRoutes.post(
  "/vehicle-specification",
  zValidator("json", schema, validateInput),
  createVehicleSpec
);

vehicleSpecRoutes.put("/vehicle-specification/:id", updateVehicleSpec);
vehicleSpecRoutes.delete("/vehicle-specification/:id", deleteVehicleSpec);
