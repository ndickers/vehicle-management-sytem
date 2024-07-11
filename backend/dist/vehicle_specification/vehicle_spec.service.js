"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.serveVehicleSpec = serveVehicleSpec;
exports.serveOneVehicleSpec = serveOneVehicleSpec;
exports.createVehicleSpecService = createVehicleSpecService;
exports.serveVehicleSpecUpdate = serveVehicleSpecUpdate;
exports.serveVehicleSpecDelete = serveVehicleSpecDelete;
const db_1 = __importDefault(require("../drizzle/db"));
const drizzle_orm_1 = require("drizzle-orm");
const schema_1 = require("../drizzle/schema");
async function serveVehicleSpec() {
    return await db_1.default.query.vehicleSpec.findMany({
        with: {
            vehicle: true,
        },
    });
}
async function serveOneVehicleSpec(id) {
    return await db_1.default.query.vehicleSpec.findMany({
        where: (0, drizzle_orm_1.eq)(schema_1.vehicleSpec.id, id),
        with: {
            vehicle: true,
        },
    });
}
async function createVehicleSpecService(vehicleSpecDetails) {
    return await db_1.default.insert(schema_1.vehicleSpec).values(vehicleSpecDetails).returning({
        id: schema_1.vehicleSpec.id,
        manufacturer: schema_1.vehicleSpec.manufacturer,
        model: schema_1.vehicleSpec.model,
        year: schema_1.vehicleSpec.year,
        fuelType: schema_1.vehicleSpec.fuelType,
        engineCapacity: schema_1.vehicleSpec.engineCapacity,
        transmission: schema_1.vehicleSpec.transmission,
        seatingCapacity: schema_1.vehicleSpec.seatingCapacity,
        color: schema_1.vehicleSpec.color,
        features: schema_1.vehicleSpec.features,
    });
}
async function serveVehicleSpecUpdate(updateDetails, id) {
    return await db_1.default
        .update(schema_1.vehicleSpec)
        .set(updateDetails)
        .where((0, drizzle_orm_1.eq)(schema_1.vehicleSpec.id, id))
        .returning({
        id: schema_1.vehicleSpec.id,
        manufacturer: schema_1.vehicleSpec.manufacturer,
        model: schema_1.vehicleSpec.model,
        year: schema_1.vehicleSpec.year,
        fuelType: schema_1.vehicleSpec.fuelType,
        engineCapacity: schema_1.vehicleSpec.engineCapacity,
        transmission: schema_1.vehicleSpec.transmission,
        seatingCapacity: schema_1.vehicleSpec.seatingCapacity,
        color: schema_1.vehicleSpec.color,
        features: schema_1.vehicleSpec.features,
    });
}
async function serveVehicleSpecDelete(id) {
    return await db_1.default
        .delete(schema_1.vehicleSpec)
        .where((0, drizzle_orm_1.eq)(schema_1.vehicleSpec.id, id))
        .returning({ vehicleSpecId: schema_1.vehicleSpec.id });
}
