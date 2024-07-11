"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllPaymentService = getAllPaymentService;
exports.getOnePaymentService = getOnePaymentService;
exports.servePaymentDelete = servePaymentDelete;
exports.createPaymentService = createPaymentService;
const db_1 = __importDefault(require("../drizzle/db"));
const drizzle_orm_1 = require("drizzle-orm");
const schema_1 = require("../drizzle/schema");
async function getAllPaymentService() {
    return await db_1.default.query.payments.findMany();
}
async function getOnePaymentService(id) {
    return await db_1.default.query.payments.findMany({ where: (0, drizzle_orm_1.eq)(schema_1.payments.id, id) });
}
async function servePaymentDelete(id) {
    return await db_1.default
        .delete(schema_1.payments)
        .where((0, drizzle_orm_1.eq)(schema_1.payments.id, id))
        .returning({ paymentId: schema_1.payments.id });
}
async function createPaymentService(paymentDetail) {
    return await db_1.default.insert(schema_1.payments).values(paymentDetail).returning({
        id: schema_1.payments.id,
    });
}
