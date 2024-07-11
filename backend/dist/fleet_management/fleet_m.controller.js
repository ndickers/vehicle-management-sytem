"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFleetManagement = getFleetManagement;
exports.getOneFleetManagement = getOneFleetManagement;
exports.createFleetManagement = createFleetManagement;
exports.updateFleetManagement = updateFleetManagement;
exports.deleteFleetManagement = deleteFleetManagement;
const fleet_m_service_1 = require("./fleet_m.service");
async function getFleetManagement(c) {
    try {
        const fleets = await (0, fleet_m_service_1.serveFleetManagement)();
        if (fleets === null) {
            return c.json({ error: "Server error" }, 500);
        }
        if (fleets?.length === 0) {
            return c.json({ message: "No fleet management registered" });
        }
        return c.json(fleets);
    }
    catch (error) {
        return c.json({ error }, 404);
    }
}
async function getOneFleetManagement(c) {
    try {
        const id = Number(c.req.param("id"));
        const fleet = await (0, fleet_m_service_1.serveOneFleetManagement)(id);
        if (fleet === null) {
            return c.json({ error: "Server Error" }, 500);
        }
        if (fleet?.length === 0) {
            return c.json({ error: "Fleet management does not exist" }, 404);
        }
        return c.json(fleet);
    }
    catch (error) {
        return c.json({ error }, 404);
    }
}
async function createFleetManagement(c) {
    const fleet = await c.req.json();
    try {
        const created = await (0, fleet_m_service_1.createFleetManagmentService)(fleet);
        if (created === null) {
            return c.json({ error: "Server error" }, 500);
        }
        return c.json(created);
    }
    catch (error) {
        return c.json({ error }, 404);
    }
}
async function updateFleetManagement(c) {
    const id = Number(c.req.param("id"));
    const fleetManagementUpdates = await c.req.json();
    try {
        const update = await (0, fleet_m_service_1.serveFleetManagementUpdate)(fleetManagementUpdates, id);
        if (update === null) {
            return c.json({ error: "Server error" }, 500);
        }
        if (update?.length === 0) {
            return c.json({ error: "Fleet management does not exist" }, 404);
        }
        return c.json(update);
    }
    catch (error) {
        return c.json({ error }, 404);
    }
}
async function deleteFleetManagement(c) {
    const id = Number(c.req.param("id"));
    try {
        const deleted = await (0, fleet_m_service_1.serveFleetManagementDelete)(id);
        if (deleted === null) {
            return c.json({ error: "Server error" }, 500);
        }
        if (deleted?.length === 0) {
            return c.json({ error: "Fleet management does not exist" }, 404);
        }
        return c.json(deleted);
    }
    catch (error) {
        return c.json({ error }, 404);
    }
}
