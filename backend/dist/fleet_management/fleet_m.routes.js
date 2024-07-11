"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fleetManagementRoutes = void 0;
const zod_1 = require("zod");
const zod_validator_1 = require("@hono/zod-validator");
const hono_1 = require("hono");
const fleet_m_controller_1 = require("./fleet_m.controller");
const validate_1 = require("../middleware/validate");
exports.fleetManagementRoutes = new hono_1.Hono();
const schema = zod_1.z.object({
    vehicleId: zod_1.z.number(),
    acquisitionDate: zod_1.z.string().date(),
    depreciationRate: zod_1.z.number(),
    currentValue: zod_1.z.number(),
    maintenanceCost: zod_1.z.number(),
    status: zod_1.z.string(),
});
exports.fleetManagementRoutes.get("/fleet-management", fleet_m_controller_1.getFleetManagement);
exports.fleetManagementRoutes.get("/fleet-management/:id", fleet_m_controller_1.getOneFleetManagement);
exports.fleetManagementRoutes.post("/fleet-management", (0, zod_validator_1.zValidator)("json", schema, validate_1.validateInput), fleet_m_controller_1.createFleetManagement);
exports.fleetManagementRoutes.put("/fleet-management/:id", fleet_m_controller_1.updateFleetManagement);
exports.fleetManagementRoutes.delete("/fleet-management/:id", fleet_m_controller_1.deleteFleetManagement);
