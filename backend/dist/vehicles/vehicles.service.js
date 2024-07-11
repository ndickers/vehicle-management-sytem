"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.serveVehicles = serveVehicles;
exports.serveOneVehicle = serveOneVehicle;
exports.createVehicleService = createVehicleService;
exports.serveVehicleUpdate = serveVehicleUpdate;
exports.serveVehicleDelete = serveVehicleDelete;
const db_1 = __importDefault(require("../drizzle/db"));
const drizzle_orm_1 = require("drizzle-orm");
const schema_1 = require("../drizzle/schema");
async function serveVehicles() {
    return await db_1.default.query.vehicles.findMany({
        with: {
            vehicle_specification: true,
            booking: {
                columns: { locationId: false, vehicleId: false, userId: false },
            },
            fleet_management: true,
        },
    });
}
async function serveOneVehicle(id) {
    return await db_1.default.query.vehicles.findMany({
        where: (0, drizzle_orm_1.eq)(schema_1.vehicles.id, id),
        with: {
            vehicle_specification: true,
            booking: {
                columns: { locationId: false, vehicleId: false, userId: false },
            },
            fleet_management: true,
        },
    });
}
async function createVehicleService(vehicleDetails) {
    return await db_1.default.insert(schema_1.vehicles).values(vehicleDetails).returning({
        id: schema_1.vehicles.id,
        rentRate: schema_1.vehicles.rentRate,
        image: schema_1.vehicles.image,
        availability: schema_1.vehicles.availability,
        createdAt: schema_1.vehicles.createdAt,
        updatedAt: schema_1.vehicles.updatedAt,
    });
}
async function serveVehicleUpdate(updateDetails, id) {
    return await db_1.default
        .update(schema_1.vehicles)
        .set(updateDetails)
        .where((0, drizzle_orm_1.eq)(schema_1.vehicles.id, id))
        .returning({
        id: schema_1.vehicles.id,
        rentRate: schema_1.vehicles.rentRate,
        availability: schema_1.vehicles.availability,
    });
}
async function serveVehicleDelete(id) {
    return await db_1.default
        .delete(schema_1.vehicles)
        .where((0, drizzle_orm_1.eq)(schema_1.vehicles.id, id))
        .returning({ vehicleId: schema_1.vehicles.id });
}
