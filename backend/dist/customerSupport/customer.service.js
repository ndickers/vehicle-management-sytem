"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.serveCustomerSupport = serveCustomerSupport;
exports.serveOneCustomerSupport = serveOneCustomerSupport;
exports.createCustomerSupportService = createCustomerSupportService;
exports.serveCustomerSupportUpdate = serveCustomerSupportUpdate;
exports.serveCustomerSupportDelete = serveCustomerSupportDelete;
const db_1 = __importDefault(require("../drizzle/db"));
const drizzle_orm_1 = require("drizzle-orm");
const schema_1 = require("../drizzle/schema");
async function serveCustomerSupport() {
    return await db_1.default.query.customerSupportTicket.findMany({
        columns: {
            userId: false,
        },
        with: {
            user: true,
        },
    });
}
async function serveOneCustomerSupport(id) {
    return await db_1.default.query.customerSupportTicket.findMany({
        where: (0, drizzle_orm_1.eq)(schema_1.customerSupportTicket.id, id),
        columns: {
            userId: false,
        },
        with: {
            user: true,
        },
    });
}
async function createCustomerSupportService(ticketDetails) {
    return await db_1.default
        .insert(schema_1.customerSupportTicket)
        .values(ticketDetails)
        .returning({
        id: schema_1.customerSupportTicket.id,
        subject: schema_1.customerSupportTicket.subject,
        description: schema_1.customerSupportTicket.description,
        status: schema_1.customerSupportTicket.status,
    });
}
async function serveCustomerSupportUpdate(updateDetails, id) {
    return await db_1.default
        .update(schema_1.customerSupportTicket)
        .set(updateDetails)
        .where((0, drizzle_orm_1.eq)(schema_1.customerSupportTicket.id, id))
        .returning({
        id: schema_1.customerSupportTicket.id,
        subject: schema_1.customerSupportTicket.subject,
        description: schema_1.customerSupportTicket.description,
        status: schema_1.customerSupportTicket.status,
    });
}
async function serveCustomerSupportDelete(id) {
    return await db_1.default
        .delete(schema_1.customerSupportTicket)
        .where((0, drizzle_orm_1.eq)(schema_1.customerSupportTicket.id, id))
        .returning({ customerTicketId: schema_1.customerSupportTicket.id });
}
