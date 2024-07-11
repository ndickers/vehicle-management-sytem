"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.serveUsers = serveUsers;
exports.serveOneUser = serveOneUser;
exports.createUserService = createUserService;
exports.serveUserUpdate = serveUserUpdate;
exports.serveUserDelete = serveUserDelete;
const db_1 = __importDefault(require("../drizzle/db"));
const drizzle_orm_1 = require("drizzle-orm");
const schema_1 = require("../drizzle/schema");
async function serveUsers() {
    return await db_1.default.query.users.findMany({
        with: {
            bookings: {
                columns: { locationId: false, vehicleId: false, userId: false },
            },
            customerSupportTickets: {
                columns: { userId: false },
            },
        },
    });
}
async function serveOneUser(id) {
    return await db_1.default.query.users.findMany({
        where: (0, drizzle_orm_1.eq)(schema_1.users.id, id),
        with: {
            bookings: {
                columns: { locationId: false, vehicleId: false, userId: false },
            },
            customerSupportTickets: {
                columns: { userId: false },
            },
        },
    });
}
async function createUserService(userDetails) {
    return await db_1.default.insert(schema_1.users).values(userDetails).returning({
        id: schema_1.users.id,
        fullname: schema_1.users.fullname,
        email: schema_1.users.email,
        phone: schema_1.users.phone,
        address: schema_1.users.address,
        role: schema_1.users.role,
        createdAt: schema_1.users.createdAt,
        updatedAt: schema_1.users.updatedAt,
    });
}
async function serveUserUpdate(updateDetails, id) {
    return await db_1.default
        .update(schema_1.users)
        .set(updateDetails)
        .where((0, drizzle_orm_1.eq)(schema_1.users.id, id))
        .returning({ users: schema_1.users });
}
async function serveUserDelete(id) {
    return await db_1.default
        .delete(schema_1.users)
        .where((0, drizzle_orm_1.eq)(schema_1.users.id, id))
        .returning({ userId: schema_1.users.id });
}
