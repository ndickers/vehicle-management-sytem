"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addUser = addUser;
exports.addAuthData = addAuthData;
exports.removeUser = removeUser;
exports.doesUserExist = doesUserExist;
exports.getUserAuth = getUserAuth;
const db_1 = __importDefault(require("../drizzle/db"));
const drizzle_orm_1 = require("drizzle-orm");
const schema_1 = require("../drizzle/schema");
async function addUser(data) {
    return await db_1.default.insert(schema_1.users).values(data).returning({ userId: schema_1.users.id });
}
async function addAuthData(data) {
    return await db_1.default
        .insert(schema_1.authentication)
        .values(data)
        .returning({ authId: schema_1.authentication.id });
}
async function removeUser(id) {
    return await db_1.default.delete(schema_1.users).where((0, drizzle_orm_1.eq)(schema_1.users.id, id));
}
async function doesUserExist(email) {
    return await db_1.default.query.users.findMany({
        where: (0, drizzle_orm_1.eq)(schema_1.users.email, email),
    });
}
async function getUserAuth(id) {
    return await db_1.default.query.authentication.findMany({
        where: (0, drizzle_orm_1.eq)(schema_1.authentication.userId, id),
    });
}
