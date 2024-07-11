"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.locationRelations = exports.location = exports.supportRelations = exports.customerSupportTicket = exports.fleetManagementRelations = exports.fleetManagement = exports.vehicleSpecRelations = exports.vehicleSpec = exports.authRelations = exports.authentication = exports.paymentRelations = exports.payments = exports.vehiclesRelations = exports.vehicles = exports.bookingRelations = exports.bookings = exports.userRelations = exports.users = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const pg_core_1 = require("drizzle-orm/pg-core");
exports.users = (0, pg_core_1.pgTable)("users", {
    id: (0, pg_core_1.serial)("id").primaryKey(),
    fullname: (0, pg_core_1.varchar)("full_name").notNull(),
    email: (0, pg_core_1.varchar)("email").notNull(),
    phone: (0, pg_core_1.varchar)("contact_phone").notNull(),
    address: (0, pg_core_1.varchar)("address").notNull(),
    role: (0, pg_core_1.varchar)("role").notNull(),
    createdAt: (0, pg_core_1.timestamp)("created_at").defaultNow(),
    updatedAt: (0, pg_core_1.timestamp)("updated_at"),
});
exports.userRelations = (0, drizzle_orm_1.relations)(exports.users, ({ many, one }) => ({
    bookings: many(exports.bookings),
    customerSupportTickets: many(exports.customerSupportTicket),
    authentication: one(exports.authentication, {
        fields: [exports.users.id],
        references: [exports.authentication.userId],
    }),
}));
exports.bookings = (0, pg_core_1.pgTable)("bookings", {
    id: (0, pg_core_1.serial)("id").primaryKey(),
    userId: (0, pg_core_1.integer)("user_id").references(() => exports.users.id),
    vehicleId: (0, pg_core_1.integer)("vehicle_id").references(() => exports.vehicles.id),
    locationId: (0, pg_core_1.integer)("location_id").references(() => exports.location.id),
    returnDate: (0, pg_core_1.date)("return_date").notNull(),
    totalAmount: (0, pg_core_1.decimal)("total_amount").notNull(),
    bookingStatus: (0, pg_core_1.varchar)("booking_status").notNull(),
    createdAt: (0, pg_core_1.timestamp)("created_at").defaultNow(),
    updatedAt: (0, pg_core_1.timestamp)("updated_at"),
});
exports.bookingRelations = (0, drizzle_orm_1.relations)(exports.bookings, ({ one }) => ({
    payment: one(exports.payments, {
        fields: [exports.bookings.id],
        references: [exports.payments.bookingId],
    }),
    users: one(exports.users, {
        fields: [exports.bookings.userId],
        references: [exports.users.id],
    }),
    vehicles: one(exports.vehicles, {
        fields: [exports.bookings.vehicleId],
        references: [exports.vehicles.id],
    }),
    location: one(exports.location, {
        fields: [exports.bookings.locationId],
        references: [exports.location.id],
    }),
}));
exports.vehicles = (0, pg_core_1.pgTable)("vehicles", {
    id: (0, pg_core_1.serial)("id").primaryKey(),
    vehicleSpecId: (0, pg_core_1.integer)("vehicle_spec_id").references(() => exports.vehicleSpec.id, {
        onDelete: "cascade",
    }),
    image: (0, pg_core_1.varchar)("image").notNull(),
    rentRate: (0, pg_core_1.decimal)("rentel_rate").notNull(),
    availability: (0, pg_core_1.boolean)("availability").notNull(),
    createdAt: (0, pg_core_1.timestamp)("created_at").defaultNow(),
    updatedAt: (0, pg_core_1.timestamp)("updated_at"),
});
exports.vehiclesRelations = (0, drizzle_orm_1.relations)(exports.vehicles, ({ one, many }) => ({
    vehicle_specification: one(exports.vehicleSpec, {
        fields: [exports.vehicles.vehicleSpecId],
        references: [exports.vehicleSpec.id],
    }),
    booking: many(exports.bookings),
    fleet_management: many(exports.fleetManagement),
}));
exports.payments = (0, pg_core_1.pgTable)("payments", {
    id: (0, pg_core_1.serial)("id").primaryKey(),
    bookingId: (0, pg_core_1.integer)("booking_id").references(() => exports.bookings.id),
    amount: (0, pg_core_1.decimal)("amount").notNull(),
    paymentStatus: (0, pg_core_1.varchar)("payment_status").notNull(),
    paymentDate: (0, pg_core_1.date)("payment_date").notNull(),
    paymentMethod: (0, pg_core_1.varchar)("payment_method").notNull(),
    transactionId: (0, pg_core_1.varchar)("transaction_id").notNull(),
    createdAt: (0, pg_core_1.timestamp)("created_at").defaultNow(),
    updatedAt: (0, pg_core_1.timestamp)("updated_at"),
});
exports.paymentRelations = (0, drizzle_orm_1.relations)(exports.payments, ({ one }) => ({
    booking: one(exports.bookings, {
        fields: [exports.payments.bookingId],
        references: [exports.bookings.id],
    }),
}));
exports.authentication = (0, pg_core_1.pgTable)("authentication", {
    id: (0, pg_core_1.serial)("id").primaryKey(),
    userId: (0, pg_core_1.integer)("user_id").references(() => exports.users.id),
    password: (0, pg_core_1.varchar)("password").notNull(),
});
exports.authRelations = (0, drizzle_orm_1.relations)(exports.authentication, ({ one }) => ({
    user: one(exports.users, {
        fields: [exports.authentication.userId],
        references: [exports.users.id],
    }),
}));
exports.vehicleSpec = (0, pg_core_1.pgTable)("vehicle_specification", {
    id: (0, pg_core_1.serial)("id").primaryKey(),
    manufacturer: (0, pg_core_1.varchar)("manufacturer").notNull(),
    model: (0, pg_core_1.varchar)("model").notNull(),
    year: (0, pg_core_1.integer)("year").notNull(),
    fuelType: (0, pg_core_1.varchar)("fuel_type").notNull(),
    engineCapacity: (0, pg_core_1.varchar)("engine_capacity").notNull(),
    transmission: (0, pg_core_1.varchar)("transmission").notNull(),
    seatingCapacity: (0, pg_core_1.integer)("seating_capacity").notNull(),
    color: (0, pg_core_1.varchar)("color").notNull(),
    features: (0, pg_core_1.text)("features").notNull(),
});
exports.vehicleSpecRelations = (0, drizzle_orm_1.relations)(exports.vehicleSpec, ({ one }) => ({
    vehicle: one(exports.vehicles, {
        fields: [exports.vehicleSpec.id],
        references: [exports.vehicles.vehicleSpecId],
    }),
}));
exports.fleetManagement = (0, pg_core_1.pgTable)("fleet_management", {
    id: (0, pg_core_1.serial)("id").primaryKey(),
    vehicleId: (0, pg_core_1.integer)("vehicle_id")
        .notNull()
        .references(() => exports.vehicles.id),
    acquisitionDate: (0, pg_core_1.date)("acquisition_date").notNull(),
    depreciationRate: (0, pg_core_1.decimal)("depreciation_rate").notNull(),
    currentValue: (0, pg_core_1.decimal)("current_value").notNull(),
    maintenanceCost: (0, pg_core_1.decimal)("maintenance_cost").notNull(),
    status: (0, pg_core_1.varchar)("status").notNull(),
    createdAt: (0, pg_core_1.timestamp)("created_at").defaultNow(),
    updatedAt: (0, pg_core_1.timestamp)("updated_at"),
});
exports.fleetManagementRelations = (0, drizzle_orm_1.relations)(exports.fleetManagement, ({ one }) => ({
    vehicle: one(exports.vehicles, {
        fields: [exports.fleetManagement.vehicleId],
        references: [exports.vehicles.id],
    }),
}));
exports.customerSupportTicket = (0, pg_core_1.pgTable)("customer_support_ticket", {
    id: (0, pg_core_1.serial)("id").primaryKey(),
    userId: (0, pg_core_1.integer)("user_id").references(() => exports.users.id),
    subject: (0, pg_core_1.varchar)("subject").notNull(),
    description: (0, pg_core_1.text)("description").notNull(),
    status: (0, pg_core_1.varchar)("status").notNull(),
    createdAt: (0, pg_core_1.timestamp)("created_at").defaultNow(),
    updatedAt: (0, pg_core_1.timestamp)("updated_at"),
});
exports.supportRelations = (0, drizzle_orm_1.relations)(exports.customerSupportTicket, ({ one }) => ({
    user: one(exports.users, {
        fields: [exports.customerSupportTicket.userId],
        references: [exports.users.id],
    }),
}));
exports.location = (0, pg_core_1.pgTable)("location", {
    id: (0, pg_core_1.serial)("id").primaryKey(),
    name: (0, pg_core_1.varchar)("name").notNull(),
    address: (0, pg_core_1.varchar)("address").notNull(),
    phone: (0, pg_core_1.varchar)("contact_phone").notNull(),
    createdAt: (0, pg_core_1.timestamp)("created_at").defaultNow(),
    updatedAt: (0, pg_core_1.timestamp)("updated_at"),
});
exports.locationRelations = (0, drizzle_orm_1.relations)(exports.location, ({ one }) => ({
    booking: one(exports.bookings, {
        fields: [exports.location.id],
        references: [exports.bookings.locationId],
    }),
}));
