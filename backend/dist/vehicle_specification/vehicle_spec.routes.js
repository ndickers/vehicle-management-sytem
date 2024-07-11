"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.vehicleSpecRoutes = void 0;
const zod_1 = require("zod");
const zod_validator_1 = require("@hono/zod-validator");
const hono_1 = require("hono");
const vehicle_spec_controller_1 = require("./vehicle_spec.controller");
const validate_1 = require("../middleware/validate");
exports.vehicleSpecRoutes = new hono_1.Hono();
const schema = zod_1.z.object({
    manufacturer: zod_1.z.string(),
    model: zod_1.z.string(),
    seatingCapacity: zod_1.z.number(),
    year: zod_1.z.number(),
    fuelType: zod_1.z.string(),
    engineCapacity: zod_1.z.string(),
    transmission: zod_1.z.string(),
    color: zod_1.z.string(),
    features: zod_1.z.string(),
});
exports.vehicleSpecRoutes.get("/vehicle-specification", vehicle_spec_controller_1.getVehicleSpec);
exports.vehicleSpecRoutes.get("/vehicle-specification/:id", vehicle_spec_controller_1.getOneVehicleSpec);
exports.vehicleSpecRoutes.post("/vehicle-specification", (0, zod_validator_1.zValidator)("json", schema, validate_1.validateInput), vehicle_spec_controller_1.createVehicleSpec);
exports.vehicleSpecRoutes.put("/vehicle-specification/:id", vehicle_spec_controller_1.updateVehicleSpec);
exports.vehicleSpecRoutes.delete("/vehicle-specification/:id", vehicle_spec_controller_1.deleteVehicleSpec);
