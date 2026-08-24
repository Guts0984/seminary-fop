import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

export const registrationTable = pgTable("registrations", {
  id: uuid("id").primaryKey().defaultRandom(),
  fullName: text("full_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  seminarSlug: text("seminar_slug").notNull(), // Connects registration to Sanity seminar
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
