"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerUser = registerUser;
exports.loginUser = loginUser;
require("dotenv/config");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const auth_service_1 = require("./auth.service");
async function registerUser(c) {
    const { password, ...userDetails } = await c.req.json();
    const checkUser = await (0, auth_service_1.doesUserExist)(userDetails.email);
    const pass = await bcrypt_1.default.hash(password, 8);
    if (checkUser === null) {
        return c.json({ error: "Server error" }, 500);
    }
    if (checkUser?.length === 0) {
        const created = await (0, auth_service_1.addUser)(userDetails);
        if (created.length !== 0) {
            const createAuth = await (0, auth_service_1.addAuthData)({
                password: pass,
                userId: created[0].userId,
            });
            if (createAuth?.length !== 0) {
                return c.json({ message: "user created" });
            }
            else {
                await (0, auth_service_1.removeUser)(created[0].userId);
            }
        }
    }
    else {
        return c.json({ error: "User already exists" }, 400);
    }
}
async function loginUser(c) {
    const { password, ...credentials } = await c.req.json();
    const getUser = await (0, auth_service_1.doesUserExist)(credentials.email);
    console.log(credentials);
    if (getUser?.length !== 0) {
        if (credentials.role.toLowerCase() === getUser[0].role.toLowerCase()) {
            const getPass = await (0, auth_service_1.getUserAuth)(getUser[0].id);
            const compare = await bcrypt_1.default.compare(password, getPass[0].password);
            if (!compare) {
                return c.json({ message: "Wrong password" }, 400);
            }
            const token = await jsonwebtoken_1.default.sign(credentials, process.env.SECRET);
            return c.json(token);
        }
        else {
            return c.json({ Error: "Confirm your role" }, 404);
        }
    }
    else {
        return c.json({ message: "User does not exist" }, 400);
    }
}
