import { sql } from "drizzle-orm";
import {
  pgTable,
  integer,
  varchar,
  timestamp,
  text,
  pgEnum,
} from "drizzle-orm/pg-core";

export const statusEnum = pgEnum("seminar_status", ["upcoming", "past"]);

export const seminarTable = pgTable("seminars", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  title: text().notNull(),
  description: text(),
  speakers: varchar({ length: 255 })
    .array()
    .notNull()
    .default(sql`'{}'::varchar[]`),
  thumbnail: text(),
  type: varchar({ length: 50 })
    .array()
    .$type<("seminar" | "webinar" | "recording")[]>()
    .notNull()
    .default(sql`'{}'::varchar[]`),
  status: statusEnum("status").notNull(),
  category: varchar({ length: 100 })
    .array()
    .notNull()
    .default(sql`'{}'::varchar[]`),
  eventDate: timestamp("event_date", { mode: "date" }).notNull(),
  price: integer().notNull().default(0),
  location: text().notNull().default(""),
});

export type SelectSeminarType = typeof seminarTable.$inferSelect;
export type InsertSeminarType = typeof seminarTable.$inferInsert;
