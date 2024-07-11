"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getVehicleSpec = getVehicleSpec;
exports.getOneVehicleSpec = getOneVehicleSpec;
exports.createVehicleSpec = createVehicleSpec;
exports.updateVehicleSpec = updateVehicleSpec;
exports.deleteVehicleSpec = deleteVehicleSpec;
const vehicle_spec_service_1 = require("./vehicle_spec.service");
async function getVehicleSpec(c) {
    try {
        const vehicleSpec = await (0, vehicle_spec_service_1.serveVehicleSpec)();
        if (vehicleSpec === null) {
            return c.json({ error: "Server error" }, 500);
        }
        if (vehicleSpec?.length === 0) {
            return c.json({ message: "No vehicle specification registered" });
        }
        return c.json(vehicleSpec);
    }
    catch (error) {
        return c.json({ error }, 404);
    }
}
async function getOneVehicleSpec(c) {
    try {
        const id = Number(c.req.param("id"));
        const vehicleSpec = await (0, vehicle_spec_service_1.serveOneVehicleSpec)(id);
        if (vehicleSpec === null) {
            return c.json({ error: "Server Error" }, 500);
        }
        if (vehicleSpec?.length === 0) {
            return c.json({ error: "Vehicle specification does not exist" }, 404);
        }
        return c.json(vehicleSpec);
    }
    catch (error) {
        return c.json({ error }, 404);
    }
}
async function createVehicleSpec(c) {
    const fleet = await c.req.json();
    try {
        const created = await (0, vehicle_spec_service_1.createVehicleSpecService)(fleet);
        if (created === null) {
            return c.json({ error: "Server error" }, 500);
        }
        return c.json(created);
    }
    catch (error) {
        return c.json({ error }, 404);
    }
}
async function updateVehicleSpec(c) {
    const id = Number(c.req.param("id"));
    const vehicleSpecUpdates = await c.req.json();
    try {
        const update = await (0, vehicle_spec_service_1.serveVehicleSpecUpdate)(vehicleSpecUpdates, id);
        if (update === null) {
            return c.json({ error: "Server error" }, 500);
        }
        if (update?.length === 0) {
            return c.json({ error: "Veehicle does not exist" }, 404);
        }
        return c.json(update);
    }
    catch (error) {
        return c.json({ error }, 404);
    }
}
async function deleteVehicleSpec(c) {
    const id = Number(c.req.param("id"));
    try {
        const deleted = await (0, vehicle_spec_service_1.serveVehicleSpecDelete)(id);
        if (deleted === null) {
            return c.json({ error: "Server error" }, 500);
        }
        if (deleted?.length === 0) {
            return c.json({ error: "Vehicle specification does not exist" }, 404);
        }
        return c.json(deleted);
    }
    catch (error) {
        return c.json({ error }, 404);
    }
}
