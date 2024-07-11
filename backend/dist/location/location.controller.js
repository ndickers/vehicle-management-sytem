"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLocation = getLocation;
exports.getOneLocation = getOneLocation;
exports.createLocation = createLocation;
exports.updateLocation = updateLocation;
exports.deleteLocation = deleteLocation;
const location_service_1 = require("./location.service");
async function getLocation(c) {
    try {
        const location = await (0, location_service_1.servelocation)();
        if (location === null) {
            return c.json({ error: "Server error" }, 500);
        }
        if (location?.length === 0) {
            return c.json({ message: "No location registered" });
        }
        return c.json(location);
    }
    catch (error) {
        return c.json({ error }, 404);
    }
}
async function getOneLocation(c) {
    try {
        const id = Number(c.req.param("id"));
        const vehicle = await (0, location_service_1.serveOneLocation)(id);
        if (vehicle === null) {
            return c.json({ error: "Server Error" }, 500);
        }
        if (vehicle?.length === 0) {
            return c.json({ error: "Location does not exist" }, 404);
        }
        return c.json(vehicle);
    }
    catch (error) {
        return c.json({ error }, 404);
    }
}
async function createLocation(c) {
    const location = await c.req.json();
    try {
        const created = await (0, location_service_1.createLocationService)(location);
        if (created === null) {
            return c.json({ error: "Server error" }, 500);
        }
        return c.json(created);
    }
    catch (error) {
        return c.json({ error }, 404);
    }
}
async function updateLocation(c) {
    const id = Number(c.req.param("id"));
    const locationUpdates = await c.req.json();
    try {
        const update = await (0, location_service_1.serveLocationUpdate)(locationUpdates, id);
        if (update === null) {
            return c.json({ error: "Server error" }, 500);
        }
        if (update?.length === 0) {
            return c.json({ error: "Location does not exist" }, 404);
        }
        return c.json(update);
    }
    catch (error) {
        return c.json({ error }, 404);
    }
}
async function deleteLocation(c) {
    const id = Number(c.req.param("id"));
    try {
        const deleted = await (0, location_service_1.serveLocationDelete)(id);
        if (deleted === null) {
            return c.json({ error: "Server error" }, 500);
        }
        if (deleted?.length === 0) {
            return c.json({ error: "Location does not exist" }, 404);
        }
        return c.json(deleted);
    }
    catch (error) {
        return c.json({ error }, 404);
    }
}
