import { relations } from "drizzle-orm";
import {
  serial,
  integer,
  date,
  text,
  timestamp,
  boolean,
  varchar,
  decimal,
  pgTable,
} from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  fullname: varchar("full_name").notNull(),
  email: varchar("email").notNull(),
  phone: varchar("contact_phone").notNull(),
  address: varchar("address").notNull(),
  verified: boolean("verified").default(false),
  role: varchar("role").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at"),
});

export const verification_tokens = pgTable("verification_tokens", {
  token_id: serial("token_id").primaryKey(),
  user_id: integer("user_id")
    .notNull()
    .references(() => users.id),
  token: varchar("token").notNull(),
  expires_at: timestamp("expires_at").notNull(),
  created_at: timestamp("updated_at").defaultNow(),
});

export const verificationRelations = relations(
  verification_tokens,
  ({ one }) => ({
    users: one(users, {
      fields: [verification_tokens.user_id],
      references: [users.id],
    }),
  })
);

export const userRelations = relations(users, ({ many, one }) => ({
  bookings: many(bookings),
  verification_tokens: many(verification_tokens),
  customerSupportTickets: many(customerSupportTicket),
  authentication: one(authentication, {
    fields: [users.id],
    references: [authentication.userId],
  }),
}));

export const bookings = pgTable("bookings", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references((): any => users.id),
  vehicleId: integer("vehicle_id").references((): any => vehicles.id),
  locationId: integer("location_id").references((): any => location.id),
  returnDate: date("return_date").notNull(),
  totalAmount: decimal("total_amount").notNull(),
  bookingStatus: varchar("booking_status").notNull().default("unpaid"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at"),
});

export const bookingRelations = relations(bookings, ({ one }) => ({
  payment: one(payments, {
    fields: [bookings.id],
    references: [payments.bookingId],
  }),
  users: one(users, {
    fields: [bookings.userId],
    references: [users.id],
  }),
  vehicles: one(vehicles, {
    fields: [bookings.vehicleId],
    references: [vehicles.id],
  }),
  location: one(location, {
    fields: [bookings.locationId],
    references: [location.id],
  }),
}));

export const vehicles = pgTable("vehicles", {
  id: serial("id").primaryKey(),
  // vehicleSpecId: integer("vehicle_spec_id").references(
  //   (): any => vehicleSpec.id,
  //   {
  //     onDelete: "cascade",
  //   }
  // ),
  image: varchar("image").notNull(),
  rentRate: decimal("rentel_rate").notNull(),
  availability: boolean("availability").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at"),
});

export const vehiclesRelations = relations(vehicles, ({ one, many }) => ({
  vehicle_specification: one(vehicleSpec, {
    fields: [vehicles.id],
    references: [vehicleSpec.vehicleId],
  }),
  booking: many(bookings),
  fleet_management: many(fleetManagement),
}));

export const payments = pgTable("payments", {
  id: serial("id").primaryKey(),
  bookingId: integer("booking_id").references((): any => bookings.id),
  amount: decimal("amount").notNull(),
  paymentStatus: varchar("payment_status").notNull(),
  paymentDate: date("payment_date").notNull(),
  paymentMethod: varchar("payment_method").notNull(),
  transactionId: varchar("transaction_id").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at"),
});

export const paymentRelations = relations(payments, ({ one }) => ({
  booking: one(bookings, {
    fields: [payments.bookingId],
    references: [bookings.id],
  }),
}));
export const authentication = pgTable("authentication", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references((): any => users.id),
  password: varchar("password").notNull(),
});
export const authRelations = relations(authentication, ({ one }) => ({
  user: one(users, {
    fields: [authentication.userId],
    references: [users.id],
  }),
}));

export const vehicleSpec = pgTable("vehicle_specification", {
  id: serial("id").primaryKey(),
  vehicleId: integer("vehicle_id").references((): any => vehicles.id, {
    onDelete: "cascade",
  }),
  manufacturer: varchar("manufacturer").notNull(),
  model: varchar("model").notNull(),
  year: integer("year").notNull(),
  fuelType: varchar("fuel_type").notNull(),
  engineCapacity: varchar("engine_capacity").notNull(),
  transmission: varchar("transmission").notNull(),
  seatingCapacity: integer("seating_capacity").notNull(),
  color: varchar("color").notNull(),
  features: text("features").notNull(),
});
export const vehicleSpecRelations = relations(vehicleSpec, ({ one }) => ({
  vehicle: one(vehicles, {
    fields: [vehicleSpec.vehicleId],
    references: [vehicles.id],
  }),
}));

export const fleetManagement = pgTable("fleet_management", {
  id: serial("id").primaryKey(),
  vehicleId: integer("vehicle_id")
    .notNull()
    .references((): any => vehicles.id),
  acquisitionDate: date("acquisition_date").notNull(),
  depreciationRate: decimal("depreciation_rate").notNull(),
  currentValue: decimal("current_value").notNull(),
  maintenanceCost: decimal("maintenance_cost").notNull(),
  status: varchar("status").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at"),
});

export const fleetManagementRelations = relations(
  fleetManagement,
  ({ one }) => ({
    vehicle: one(vehicles, {
      fields: [fleetManagement.vehicleId],
      references: [vehicles.id],
    }),
  })
);
export const customerSupportTicket = pgTable("customer_support_ticket", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references((): any => users.id),
  subject: varchar("subject").notNull(),
  description: text("description").notNull(),
  status: varchar("status").default("pending").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at"),
});

export const supportRelations = relations(customerSupportTicket, ({ one }) => ({
  user: one(users, {
    fields: [customerSupportTicket.userId],
    references: [users.id],
  }),
}));

export const location = pgTable("location", {
  id: serial("id").primaryKey(),
  name: varchar("name").notNull(),
  address: varchar("address").notNull(),
  phone: varchar("contact_phone").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at"),
});

export const locationRelations = relations(location, ({ one }) => ({
  booking: one(bookings, {
    fields: [location.id],
    references: [bookings.locationId],
  }),
}));

export type TSUsers = typeof users.$inferSelect;
export type TIUsers = typeof users.$inferInsert;

export type TSBooking = typeof bookings.$inferSelect;
export type TIBooking = typeof bookings.$inferInsert;

export type TSPayment = typeof payments.$inferSelect;
export type TIPayment = typeof payments.$inferInsert;

export type TSLocation = typeof location.$inferSelect;
export type TILocation = typeof location.$inferInsert;

export type TSVehicles = typeof vehicles.$inferSelect;
export type TIVehicles = typeof vehicles.$inferInsert;

export type TSVehicleSpec = typeof vehicleSpec.$inferSelect;
export type TIVehicleSpec = typeof vehicleSpec.$inferInsert;

export type TSFleet = typeof fleetManagement.$inferSelect;
export type TIFleet = typeof fleetManagement.$inferInsert;

export type TSCustomerSupport = typeof customerSupportTicket.$inferSelect;
export type TICustomerSupport = typeof customerSupportTicket.$inferInsert;

export type TSAuth = typeof authentication.$inferSelect;
export type TIAuth = typeof authentication.$inferInsert;

export type TSToken = typeof verification_tokens.$inferSelect;
export type TIToken = typeof verification_tokens.$inferInsert;
