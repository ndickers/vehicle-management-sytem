import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { usersRoutes } from "./users/users.routes";
import { bookingRoutes } from "./bookings/booking.routes";
import { vehicleRoutes } from "./vehicles/vehicles.routes";
import { locationRoutes } from "./location/location.routes";
import { paymentRoutes } from "./payment/payment.routes";
import { authRoutes } from "./auth/auth.routes";
import { customerSupportRoutes } from "./customerSupport/customer.routes";
import { fleetManagementRoutes } from "./fleet_management/fleet_m.routes";
import { vehicleSpecRoutes } from "./vehicle_specification/vehicle_spec.routes";
import { cors } from "hono/cors";
import db from "./drizzle/db";
const app = new Hono();

app.use(cors());

app.route("/", usersRoutes);
app.route("/", bookingRoutes);
app.route("/", vehicleRoutes);
app.route("/", locationRoutes);
app.route("/", vehicleSpecRoutes);
app.route("/", fleetManagementRoutes);
app.route("/", customerSupportRoutes);
app.route("/", paymentRoutes);
app.route("/", authRoutes);

const port = 3000;
console.log(`Server is running on port ${port}`);

serve({
  fetch: app.fetch,
  port,
});
