"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorize = authorize;
exports.adminAuth = adminAuth;
exports.userAuth = userAuth;
exports.authorizeAll = authorizeAll;
require("dotenv/config");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
async function authorize(c, next, userRole) {
    const token = c.req.header("Authorization");
    if (!token) {
        return c.json({ message: "You're unauthorized" }, 401);
    }
    try {
        const { role } = jsonwebtoken_1.default.verify(token, process.env.SECRET);
        console.log(role);
        if (userRole === "both") {
            await next();
        }
        if (role === userRole) {
            await next();
        }
        return c.json({ message: "The user is unauthorized" }, 401);
    }
    catch (error) {
        return c.json({ message: "Invalid token" }, 403);
    }
}
async function adminAuth(c, next) {
    return authorize(c, next, "admin");
}
async function userAuth(c, next) {
    return authorize(c, next, "user");
}
async function authorizeAll(c, next) {
    return authorize(c, next, "both");
}
