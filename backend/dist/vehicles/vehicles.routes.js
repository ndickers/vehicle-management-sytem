"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.vehicleRoutes = void 0;
const zod_1 = require("zod");
const zod_validator_1 = require("@hono/zod-validator");
const hono_1 = require("hono");
const vehicles_controller_1 = require("./vehicles.controller");
const validate_1 = require("../middleware/validate");
exports.vehicleRoutes = new hono_1.Hono();
const schema = zod_1.z.object({
    vehicleSpecId: zod_1.z.number(),
    rentRate: zod_1.z.number(),
    availability: zod_1.z.boolean(),
});
exports.vehicleRoutes.get("/vehicles", vehicles_controller_1.getVehicles);
exports.vehicleRoutes.get("/vehicles/:id", vehicles_controller_1.getOneVehicle);
exports.vehicleRoutes.post("/vehicles", (0, zod_validator_1.zValidator)("json", schema, validate_1.validateInput), vehicles_controller_1.createVehicle);
exports.vehicleRoutes.put("/vehicles/:id", vehicles_controller_1.updateVehicle);
exports.vehicleRoutes.delete("/vehicles/:id", vehicles_controller_1.deleteVehicle);
