"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.customerSupportRoutes = void 0;
const zod_1 = require("zod");
const zod_validator_1 = require("@hono/zod-validator");
const hono_1 = require("hono");
const customer_controller_1 = require("./customer.controller");
const validate_1 = require("../middleware/validate");
exports.customerSupportRoutes = new hono_1.Hono();
const schema = zod_1.z.object({
    userId: zod_1.z.number(),
    subject: zod_1.z.string(),
    description: zod_1.z.string(),
    status: zod_1.z.string(),
});
exports.customerSupportRoutes.get("/customer-support", customer_controller_1.getCustomerSupport);
exports.customerSupportRoutes.get("/customer-support/:id", customer_controller_1.getOneCustomerSupport);
exports.customerSupportRoutes.post("/customer-support", (0, zod_validator_1.zValidator)("json", schema, validate_1.validateInput), customer_controller_1.createCustomerSupport);
exports.customerSupportRoutes.put("/customer-support/:id", customer_controller_1.updateCustomerSupport);
exports.customerSupportRoutes.delete("/customer-support/:id", customer_controller_1.deleteCustomerSupport);
