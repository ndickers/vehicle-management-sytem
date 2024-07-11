"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUsers = getUsers;
exports.getOneUser = getOneUser;
exports.createUser = createUser;
exports.updateUser = updateUser;
exports.deleteUser = deleteUser;
const users_service_1 = require("./users.service");
async function getUsers(c) {
    try {
        const users = await (0, users_service_1.serveUsers)();
        if (users === null) {
            return c.json({ error: "Server error" }, 500);
        }
        if (users?.length === 0) {
            return c.json({ message: "No user registered" });
        }
        return c.json(users);
    }
    catch (error) {
        return c.json({ error }, 404);
    }
}
async function getOneUser(c) {
    try {
        const id = Number(c.req.param("id"));
        const user = await (0, users_service_1.serveOneUser)(id);
        if (user === null) {
            return c.json({ error: "Server Error" }, 500);
        }
        if (user?.length === 0) {
            return c.json({ error: "User does not exist" }, 404);
        }
        return c.json(user);
    }
    catch (error) {
        return c.json({ error }, 404);
    }
}
async function createUser(c) {
    const user = await c.req.json();
    try {
        const created = await (0, users_service_1.createUserService)(user);
        if (created === null) {
            return c.json({ error: "Server error" }, 500);
        }
        return c.json(created);
    }
    catch (error) {
        return c.json({ error }, 404);
    }
}
async function updateUser(c) {
    const id = Number(c.req.param("id"));
    const userUpdates = await c.req.json();
    try {
        const update = await (0, users_service_1.serveUserUpdate)(userUpdates, id);
        if (update === null) {
            return c.json({ error: "Server error" }, 500);
        }
        if (update?.length === 0) {
            return c.json({ error: "User does not exist" }, 404);
        }
        return c.json(update);
    }
    catch (error) {
        return c.json({ error }, 404);
    }
}
async function deleteUser(c) {
    const id = Number(c.req.param("id"));
    try {
        const deleted = await (0, users_service_1.serveUserDelete)(id);
        if (deleted === null) {
            return c.json({ error: "Server error" }, 500);
        }
        if (deleted?.length === 0) {
            return c.json({ error: "User does not exist" }, 404);
        }
        return c.json(deleted);
    }
    catch (error) {
        return c.json({ error }, 404);
    }
}
