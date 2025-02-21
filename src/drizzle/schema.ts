import { pgTable, serial, text, varchar, integer, timestamp, boolean, decimal } from "drizzle-orm/pg-core";
import { relations } from 'drizzle-orm';

export const UserTable = pgTable("users", {
    id: serial('id').primaryKey(),
    username: varchar('username', { length: 50 }).unique().notNull(),
    email: varchar("email", { length: 100 }).unique().notNull(),
    password: varchar('password', { length: 255 }).notNull(),
    role: varchar('role', { length: 50 }).default('user').notNull(),
    created_at: timestamp('created_at').defaultNow(),
    updated_at: timestamp('updated_at').defaultNow()
});

export const FleetTable = pgTable("fleet", {
    id: serial('id').primaryKey(),
    name: varchar('name', { length: 255 }).notNull(),
    created_at: timestamp('created_at').defaultNow(),
    updated_at: timestamp('updated_at').defaultNow()
});

export const VehicleTable = pgTable("vehicles", {
    id: serial('id').primaryKey(),
    fleet_id: integer('fleet_id').notNull().references(() => FleetTable.id, { onDelete: "cascade" }),
    model: varchar('model', { length: 255 }).notNull(),
    year: integer('year').notNull(),
    price_per_day: decimal('price_per_day', { precision: 10, scale: 2 }).notNull(),
    created_at: timestamp('created_at').defaultNow(),
    updated_at: timestamp('updated_at').defaultNow()
});

export const SpecificationsTable = pgTable("specifications", {
    id: serial('id').primaryKey(),
    vehicle_id: integer('vehicle_id').notNull().references(() => VehicleTable.id, { onDelete: "cascade" }),
    engine: varchar('engine', { length: 255 }).notNull(),
    fuel_type: varchar('fuel_type', { length: 50 }).notNull(),
    transmission: varchar('transmission', { length: 50 }).notNull(),
    seating_capacity: integer('seating_capacity').notNull(),
    created_at: timestamp('created_at').defaultNow(),
    updated_at: timestamp('updated_at').defaultNow()
});

export const LocationTable = pgTable("location", {
    id: serial('id').primaryKey(),
    name: varchar('name', { length: 255 }).notNull(),
    address: text('address').notNull(),
    created_at: timestamp('created_at').defaultNow(),
    updated_at: timestamp('updated_at').defaultNow()
});

export const BookingTable = pgTable("bookings", {
    id: serial('id').primaryKey(),
    user_id: integer('user_id').notNull().references(() => UserTable.id, { onDelete: "cascade" }),
    vehicle_id: integer('vehicle_id').notNull().references(() => VehicleTable.id, { onDelete: "cascade" }),
    location_id: integer('location_id').notNull().references(() => LocationTable.id, { onDelete: "cascade" }),
    start_date: timestamp('start_date').notNull(),
    end_date: timestamp('end_date').notNull(),
    status: varchar('status', { length: 50 }).default('pending').notNull(),
    discount_id: integer('discount_id').references(() => DiscountsTable.id, { onDelete: "set null" }),
    insurance_id: integer('insurance_id').references(() => InsuranceTable.id, { onDelete: "set null" }),
    created_at: timestamp('created_at').defaultNow(),
    updated_at: timestamp('updated_at').defaultNow()
});

export const PaymentTable = pgTable("payments", {
    id: serial('id').primaryKey(),
    booking_id: integer('booking_id').notNull().references(() => BookingTable.id, { onDelete: "cascade" }),
    amount: decimal('amount', { precision: 10, scale: 2 }).notNull(),
    status: varchar('status', { length: 50 }).default('pending').notNull(),
    payment_date: timestamp('payment_date').defaultNow(),
    created_at: timestamp('created_at').defaultNow(),
    updated_at: timestamp('updated_at').defaultNow()
});

export const TicketsTable = pgTable("tickets", {
    id: serial('id').primaryKey(),
    user_id: integer('user_id').notNull().references(() => UserTable.id, { onDelete: "cascade" }),
    booking_id: integer('booking_id').notNull().references(() => BookingTable.id, { onDelete: "cascade" }),
    issue: text('issue').notNull(),
    status: varchar('status', { length: 50 }).default("open").notNull(),
    created_at: timestamp('created_at').defaultNow(),
    updated_at: timestamp('updated_at').defaultNow()
});

export const DiscountsTable = pgTable("discounts", {
    id: serial('id').primaryKey(),
    code: varchar('code', { length: 50 }).unique().notNull(),
    percentage: decimal('percentage', { precision: 5, scale: 2 }).notNull(),
    expiry_date: timestamp('expiry_date').notNull(),
    created_at: timestamp('created_at').defaultNow(),
    updated_at: timestamp('updated_at').defaultNow()
});

export const InsuranceTable = pgTable("insurance", {
    id: serial('id').primaryKey(),
    provider: varchar('provider', { length: 255 }).notNull(),
    coverage_details: text('coverage_details').notNull(),
    price: decimal('price', { precision: 10, scale: 2 }).notNull(),
    created_at: timestamp('created_at').defaultNow(),
    updated_at: timestamp('updated_at').defaultNow()
});

export const ReviewsTable = pgTable("reviews", {
    id: serial('id').primaryKey(),
    user_id: integer('user_id').notNull().references(() => UserTable.id, { onDelete: "cascade" }),
    vehicle_id: integer('vehicle_id').notNull().references(() => VehicleTable.id, { onDelete: "cascade" }),
    rating: integer('rating').notNull(),
    comment: text('comment'),
    created_at: timestamp('created_at').defaultNow()
});

export const CheckOutTable = pgTable("car_check_out", {
    id: serial('id').primaryKey(),
    booking_id: integer('booking_id').notNull().references(() => BookingTable.id, { onDelete: "cascade" }),
    check_out_date: timestamp('check_out_date').defaultNow().notNull()
});

export const CheckInTable = pgTable("car_check_in", {
    id: serial('id').primaryKey(),
    booking_id: integer('booking_id').notNull().references(() => BookingTable.id, { onDelete: "cascade" }),
    check_in_date: timestamp('check_in_date').defaultNow().notNull()
});

export const userRelations = relations(UserTable, ({ one,many }) => ({
    booking: many(BookingTable),
    tickets: many(TicketsTable),
    reviews: many(ReviewsTable)
}));

export const fleetRelations = relations(FleetTable, ({ one,many }) => ({
    vehicles: many(VehicleTable)
}));

export const vehicleRelations = relations(VehicleTable, ({ one,many }) => ({
    fleet: one(FleetTable),
    specifications: one(SpecificationsTable),
    bookings: many(BookingTable),
    reviews: many(ReviewsTable)
}));

export const specificationsRelations = relations(SpecificationsTable, ({ one,many }) => ({
    vehicle: one(VehicleTable)
}));

export const locationRelations = relations(LocationTable, ({ one,many }) => ({
    bookings: many(BookingTable)
}));

export const bookingRelations = relations(BookingTable, ({ one,many }) => ({
    user: one(UserTable),
    vehicle: one(VehicleTable),
    location: one(LocationTable),
    payment: one(PaymentTable),
    discount: one(DiscountsTable),
    insurance: one(InsuranceTable),
    tickets: many(TicketsTable),
    check_out: one(CheckOutTable),
    check_in: one(CheckInTable)
}));

export const paymentRelations = relations(PaymentTable, ({ one,many }) => ({
    booking: one(BookingTable)
}));

export const ticketsRelations = relations(TicketsTable, ({ one,many }) => ({
    user: one(UserTable),
    booking: one(BookingTable)
}));

export const discountsRelations = relations(DiscountsTable, ({ one,many }) => ({
    bookings: many(BookingTable)
}));

export const insuranceRelations = relations(InsuranceTable, ({ one,many }) => ({
    bookings: many(BookingTable)
}));

export const reviewsRelations = relations(ReviewsTable, ({ one,many }) => ({
    user: one(UserTable),
    vehicle: one(VehicleTable)
}));

export const checkOutRelations = relations(CheckOutTable, ({ one,many }) => ({
    booking: one(BookingTable)
}));

export const checkInRelations = relations(CheckInTable, ({ one,many }) => ({
    booking: one(BookingTable)
}));


export type TIUser = typeof UserTable.$inferInsert;
export type TSUser = typeof UserTable.$inferSelect;

export type TIFleet = typeof FleetTable.$inferInsert;
export type TSFleet = typeof FleetTable.$inferSelect;

export type TIVehicle = typeof VehicleTable.$inferInsert;
export type TSVehicle = typeof VehicleTable.$inferSelect;

export type TISpecifications = typeof SpecificationsTable.$inferInsert;
export type TSSpecifications = typeof SpecificationsTable.$inferSelect;

export type TILocation = typeof LocationTable.$inferInsert;
export type TSLocation = typeof LocationTable.$inferSelect;

export type TIBooking = typeof BookingTable.$inferInsert;
export type TSBooking = typeof BookingTable.$inferSelect;

export type TIPayment = typeof PaymentTable.$inferInsert;
export type TSPayment = typeof PaymentTable.$inferSelect;

export type TITickets = typeof TicketsTable.$inferInsert;
export type TSTickets = typeof TicketsTable.$inferSelect;

export type TIDiscounts = typeof DiscountsTable.$inferInsert;
export type TSDiscounts = typeof DiscountsTable.$inferSelect;

export type TIInsurance = typeof InsuranceTable.$inferInsert;
export type TSInsurance = typeof InsuranceTable.$inferSelect;

export type TIReviews = typeof ReviewsTable.$inferInsert;
export type TSReviews = typeof ReviewsTable.$inferSelect;

export type TICheckOut = typeof CheckOutTable.$inferInsert;
export type TSCheckOut = typeof CheckOutTable.$inferSelect;

export type TICheckIn = typeof CheckInTable.$inferInsert;
export type TSCheckIn = typeof CheckInTable.$inferSelect;

