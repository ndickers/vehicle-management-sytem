"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.servelocation = servelocation;
exports.serveOneLocation = serveOneLocation;
exports.createLocationService = createLocationService;
exports.serveLocationUpdate = serveLocationUpdate;
exports.serveLocationDelete = serveLocationDelete;
const db_1 = __importDefault(require("../drizzle/db"));
const drizzle_orm_1 = require("drizzle-orm");
const schema_1 = require("../drizzle/schema");
async function servelocation() {
    return await db_1.default.query.location.findMany({
        with: {
            booking: {
                columns: { locationId: false, vehicleId: false, userId: false },
            },
        },
    });
}
async function serveOneLocation(id) {
    return await db_1.default.query.location.findMany({
        where: (0, drizzle_orm_1.eq)(schema_1.location.id, id),
        with: {
            booking: {
                columns: { locationId: false, vehicleId: false, userId: false },
            },
        },
    });
}
async function createLocationService(locationDetails) {
    return await db_1.default.insert(schema_1.location).values(locationDetails).returning({
        id: schema_1.location.id,
        name: schema_1.location.name,
        address: schema_1.location.address,
        phone: schema_1.location.phone,
    });
}
async function serveLocationUpdate(updateDetails, id) {
    return await db_1.default
        .update(schema_1.location)
        .set(updateDetails)
        .where((0, drizzle_orm_1.eq)(schema_1.location.id, id))
        .returning({
        locationId: schema_1.location.id,
        name: schema_1.location.name,
        address: schema_1.location.address,
        phone: schema_1.location.phone,
    });
}
async function serveLocationDelete(id) {
    return await db_1.default
        .delete(schema_1.location)
        .where((0, drizzle_orm_1.eq)(schema_1.location.id, id))
        .returning({ locationId: schema_1.location.id });
}
