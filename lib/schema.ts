import { pgTable, text, boolean, integer, timestamp, uuid } from "drizzle-orm/pg-core"
import { relations } from "drizzle-orm"

export const events = pgTable("Event", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  artistName: text("artistName"),
  title: text("title").notNull(),
  description: text("description").notNull(),
  location: text("location").notNull(),
  date: text("date").notNull(),
  time: text("time").notNull(),
  image: text("image"),
  section: text("section"),
  ticketType: text("ticketType"),
  level: text("level"),
  seatMap: text("seatMap").default("[]").notNull(),
  hasTimer: boolean("hasTimer").default(false).notNull(),
  eventDate: text("eventDate"),
  eventTime: text("eventTime"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
})

export const seats = pgTable("Seat", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  eventId: text("eventId").notNull().references(() => events.id, { onDelete: "cascade" }),
  row: text("row").notNull(),
  seatNum: integer("seatNum").notNull(),
  available: boolean("available").default(true).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
})

export const claimedSeats = pgTable("ClaimedSeat", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  eventId: text("eventId").notNull().references(() => events.id, { onDelete: "cascade" }),
  seatRow: text("seatRow").notNull(),
  seatNum: integer("seatNum").notNull(),
  email: text("email").notNull(),
  name: text("name").notNull(),
  ticketId: text("ticketId").unique().notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
})

export const eventsRelations = relations(events, ({ many }) => ({
  seats: many(seats),
  claimedSeats: many(claimedSeats),
}))

export const seatsRelations = relations(seats, ({ one }) => ({
  event: one(events, {
    fields: [seats.eventId],
    references: [events.id],
  }),
}))

export const claimedSeatsRelations = relations(claimedSeats, ({ one }) => ({
  event: one(events, {
    fields: [claimedSeats.eventId],
    references: [events.id],
  }),
}))
