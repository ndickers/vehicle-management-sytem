"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.serveFleetManagement = serveFleetManagement;
exports.serveOneFleetManagement = serveOneFleetManagement;
exports.createFleetManagmentService = createFleetManagmentService;
exports.serveFleetManagementUpdate = serveFleetManagementUpdate;
exports.serveFleetManagementDelete = serveFleetManagementDelete;
const db_1 = __importDefault(require("../drizzle/db"));
const drizzle_orm_1 = require("drizzle-orm");
const schema_1 = require("../drizzle/schema");
async function serveFleetManagement() {
    return await db_1.default.query.fleetManagement.findMany({
        with: {
            vehicle: true,
        },
    });
}
async function serveOneFleetManagement(id) {
    return await db_1.default.query.fleetManagement.findMany({
        where: (0, drizzle_orm_1.eq)(schema_1.fleetManagement.id, id),
        with: {
            vehicle: true,
        },
    });
}
async function createFleetManagmentService(fleetDetails) {
    return await db_1.default.insert(schema_1.fleetManagement).values(fleetDetails).returning({
        id: schema_1.fleetManagement.id,
        acquisitionDate: schema_1.fleetManagement.acquisitionDate,
        depreciationRate: schema_1.fleetManagement.depreciationRate,
        currentValue: schema_1.fleetManagement.currentValue,
        maintenanceCost: schema_1.fleetManagement.maintenanceCost,
        status: schema_1.fleetManagement.status,
    });
}
async function serveFleetManagementUpdate(updateDetails, id) {
    return await db_1.default
        .update(schema_1.fleetManagement)
        .set(updateDetails)
        .where((0, drizzle_orm_1.eq)(schema_1.fleetManagement.id, id))
        .returning({
        id: schema_1.fleetManagement.id,
        acquisitionDate: schema_1.fleetManagement.acquisitionDate,
        depreciationRate: schema_1.fleetManagement.depreciationRate,
        currentValue: schema_1.fleetManagement.currentValue,
        maintenanceCost: schema_1.fleetManagement.maintenanceCost,
        status: schema_1.fleetManagement.status,
    });
}
async function serveFleetManagementDelete(id) {
    return await db_1.default
        .delete(schema_1.fleetManagement)
        .where((0, drizzle_orm_1.eq)(schema_1.fleetManagement.id, id))
        .returning({ fleetManagementId: schema_1.fleetManagement.id });
}
