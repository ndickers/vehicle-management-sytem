import { z } from "zod";
import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import {
  getLocation,
  getOneLocation,
  createLocation,
  updateLocation,
  deleteLocation,
} from "./location.controller";
import { validateInput } from "../middleware/validate";

export const locationRoutes = new Hono();

const schema = z.object({
  name: z.string(),
  address: z.string(),
  phone: z.string(),
});

locationRoutes.get("/location", getLocation);
locationRoutes.get("/location/:id", getOneLocation);

locationRoutes.post(
  "/location",
  zValidator("json", schema, validateInput),
  createLocation
);

locationRoutes.put("/location/:id", updateLocation);
locationRoutes.delete("/location/:id", deleteLocation);
