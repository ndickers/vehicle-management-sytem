"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRoutes = void 0;
const zod_1 = require("zod");
const zod_validator_1 = require("@hono/zod-validator");
const hono_1 = require("hono");
const validate_1 = require("../middleware/validate");
const auth_controller_1 = require("./auth.controller");
exports.authRoutes = new hono_1.Hono();
const schema = zod_1.z.object({
    fullname: zod_1.z.string(),
    email: zod_1.z.string().email(),
    phone: zod_1.z.string(),
    address: zod_1.z.string(),
    role: zod_1.z.string(),
    password: zod_1.z.string(),
});
const schema2 = zod_1.z.object({
    email: zod_1.z.string().email(),
    role: zod_1.z.string(),
    password: zod_1.z.string(),
});
exports.authRoutes.post("/register", (0, zod_validator_1.zValidator)("json", schema, validate_1.validateInput), auth_controller_1.registerUser);
exports.authRoutes.post("/login", (0, zod_validator_1.zValidator)("json", schema2, validate_1.validateInput), auth_controller_1.loginUser);
