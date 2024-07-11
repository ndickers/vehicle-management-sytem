"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_server_1 = require("@hono/node-server");
const hono_1 = require("hono");
const users_routes_1 = require("./users/users.routes");
const booking_routes_1 = require("./bookings/booking.routes");
const vehicles_routes_1 = require("./vehicles/vehicles.routes");
const location_routes_1 = require("./location/location.routes");
const payment_routes_1 = require("./payment/payment.routes");
const auth_routes_1 = require("./auth/auth.routes");
const customer_routes_1 = require("./customerSupport/customer.routes");
const fleet_m_routes_1 = require("./fleet_management/fleet_m.routes");
const vehicle_spec_routes_1 = require("./vehicle_specification/vehicle_spec.routes");
const app = new hono_1.Hono();
app.route("/", users_routes_1.usersRoutes);
app.route("/", booking_routes_1.bookingRoutes);
app.route("/", vehicles_routes_1.vehicleRoutes);
app.route("/", location_routes_1.locationRoutes);
app.route("/", vehicle_spec_routes_1.vehicleSpecRoutes);
app.route("/", fleet_m_routes_1.fleetManagementRoutes);
app.route("/", customer_routes_1.customerSupportRoutes);
app.route("/", payment_routes_1.paymentRoutes);
app.route("/", auth_routes_1.authRoutes);
const port = 3000;
console.log(`Server is running on port ${port}`);
(0, node_server_1.serve)({
    fetch: app.fetch,
    port,
});
