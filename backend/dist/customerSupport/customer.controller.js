"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCustomerSupport = getCustomerSupport;
exports.getOneCustomerSupport = getOneCustomerSupport;
exports.createCustomerSupport = createCustomerSupport;
exports.updateCustomerSupport = updateCustomerSupport;
exports.deleteCustomerSupport = deleteCustomerSupport;
const customer_service_1 = require("./customer.service");
async function getCustomerSupport(c) {
    try {
        const ticket = await (0, customer_service_1.serveCustomerSupport)();
        if (ticket === null) {
            return c.json({ error: "Server error" }, 500);
        }
        if (ticket?.length === 0) {
            return c.json({ message: "No customer support ticket registered" });
        }
        return c.json(ticket);
    }
    catch (error) {
        return c.json({ error }, 404);
    }
}
async function getOneCustomerSupport(c) {
    try {
        const id = Number(c.req.param("id"));
        const ticket = await (0, customer_service_1.serveOneCustomerSupport)(id);
        if (ticket === null) {
            return c.json({ error: "Server Error" }, 500);
        }
        if (ticket?.length === 0) {
            return c.json({ error: "Customer support ticket does not exist" }, 404);
        }
        return c.json(ticket);
    }
    catch (error) {
        return c.json({ error }, 404);
    }
}
async function createCustomerSupport(c) {
    const ticket = await c.req.json();
    try {
        const created = await (0, customer_service_1.createCustomerSupportService)(ticket);
        if (created === null) {
            return c.json({ error: "Server error" }, 500);
        }
        return c.json(created);
    }
    catch (error) {
        return c.json({ error }, 404);
    }
}
async function updateCustomerSupport(c) {
    const id = Number(c.req.param("id"));
    const ticketUpdates = await c.req.json();
    try {
        const update = await (0, customer_service_1.serveCustomerSupportUpdate)(ticketUpdates, id);
        if (update === null) {
            return c.json({ error: "Server error" }, 500);
        }
        if (update?.length === 0) {
            return c.json({ error: "Customer Support Ticket does not exist" }, 404);
        }
        return c.json(update);
    }
    catch (error) {
        return c.json({ error }, 404);
    }
}
async function deleteCustomerSupport(c) {
    const id = Number(c.req.param("id"));
    try {
        const deleted = await (0, customer_service_1.serveCustomerSupportDelete)(id);
        if (deleted === null) {
            return c.json({ error: "Server error" }, 500);
        }
        if (deleted?.length === 0) {
            return c.json({ error: "Customer support ticket does not exist" }, 404);
        }
        return c.json(deleted);
    }
    catch (error) {
        return c.json({ error }, 404);
    }
}
