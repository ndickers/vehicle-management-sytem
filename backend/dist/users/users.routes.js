"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersRoutes = void 0;
const zod_1 = require("zod");
const zod_validator_1 = require("@hono/zod-validator");
const hono_1 = require("hono");
const users_controller_1 = require("./users.controller");
const authorization_1 = require("../middleware/authorization");
const validate_1 = require("../middleware/validate");
exports.usersRoutes = new hono_1.Hono();
const schema = zod_1.z.object({
    fullname: zod_1.z.string(),
    email: zod_1.z.string().email(),
    phone: zod_1.z.string(),
    address: zod_1.z.string(),
    role: zod_1.z.string(),
    password: zod_1.z.string(),
});
exports.usersRoutes.get("/users", users_controller_1.getUsers);
exports.usersRoutes.get("/users/:id", authorization_1.userAuth, users_controller_1.getOneUser);
exports.usersRoutes.post("/users", (0, zod_validator_1.zValidator)("json", schema, validate_1.validateInput), users_controller_1.createUser);
exports.usersRoutes.put("/users/:id", users_controller_1.updateUser);
exports.usersRoutes.delete("/users/:id", users_controller_1.deleteUser);
