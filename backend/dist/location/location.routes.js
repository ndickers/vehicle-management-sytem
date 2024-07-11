"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.locationRoutes = void 0;
const zod_1 = require("zod");
const zod_validator_1 = require("@hono/zod-validator");
const hono_1 = require("hono");
const location_controller_1 = require("./location.controller");
const validate_1 = require("../middleware/validate");
exports.locationRoutes = new hono_1.Hono();
const schema = zod_1.z.object({
    name: zod_1.z.string(),
    address: zod_1.z.string(),
    phone: zod_1.z.string(),
});
exports.locationRoutes.get("/location", location_controller_1.getLocation);
exports.locationRoutes.get("/location/:id", location_controller_1.getOneLocation);
exports.locationRoutes.post("/location", (0, zod_validator_1.zValidator)("json", schema, validate_1.validateInput), location_controller_1.createLocation);
exports.locationRoutes.put("/location/:id", location_controller_1.updateLocation);
exports.locationRoutes.delete("/location/:id", location_controller_1.deleteLocation);
