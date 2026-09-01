import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

export const registrationTable = pgTable("seminar_registrations", {
  id: uuid("id").defaultRandom().primaryKey(),
  seminarId: text("seminar_id").notNull(), // Sanity document _id, not a Postgres FK
  name: text("name").notNull(),
  position: text("position").notNull(),
  type: text("type").notNull(),
  company: text("company").notNull(),
  address: text("address").notNull(),
  phone: text("phone").notNull(),
  email: text("email").notNull(),
  participants: text("participants").array().notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
