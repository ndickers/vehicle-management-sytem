"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getVehicles = getVehicles;
exports.getOneVehicle = getOneVehicle;
exports.createVehicle = createVehicle;
exports.updateVehicle = updateVehicle;
exports.deleteVehicle = deleteVehicle;
const vehicles_service_1 = require("./vehicles.service");
async function getVehicles(c) {
    try {
        const vehicles = await (0, vehicles_service_1.serveVehicles)();
        if (vehicles === null) {
            return c.json({ error: "Server error" }, 500);
        }
        if (vehicles?.length === 0) {
            return c.json({ message: "No vehicle registered" });
        }
        return c.json(vehicles);
    }
    catch (error) {
        return c.json({ error }, 404);
    }
}
async function getOneVehicle(c) {
    try {
        const id = Number(c.req.param("id"));
        const vehicle = await (0, vehicles_service_1.serveOneVehicle)(id);
        if (vehicle === null) {
            return c.json({ error: "Server Error" }, 500);
        }
        if (vehicle?.length === 0) {
            return c.json({ error: "Vehicle does not exist" }, 404);
        }
        return c.json(vehicle);
    }
    catch (error) {
        return c.json({ error }, 404);
    }
}
async function createVehicle(c) {
    const vehicle = await c.req.json();
    try {
        const created = await (0, vehicles_service_1.createVehicleService)(vehicle);
        if (created === null) {
            return c.json({ error: "Server error" }, 500);
        }
        return c.json(created);
    }
    catch (error) {
        return c.json({ error }, 404);
    }
}
async function updateVehicle(c) {
    const id = Number(c.req.param("id"));
    const vehicleUpdates = await c.req.json();
    try {
        const update = await (0, vehicles_service_1.serveVehicleUpdate)(vehicleUpdates, id);
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
async function deleteVehicle(c) {
    const id = Number(c.req.param("id"));
    try {
        const deleted = await (0, vehicles_service_1.serveVehicleDelete)(id);
        if (deleted === null) {
            return c.json({ error: "Server error" }, 500);
        }
        if (deleted?.length === 0) {
            return c.json({ error: "Vehicle does not exist" }, 404);
        }
        return c.json(deleted);
    }
    catch (error) {
        return c.json({ error }, 404);
    }
}
