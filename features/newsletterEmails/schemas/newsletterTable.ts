import {
  pgTable,
  integer,
  varchar,
  timestamp,
  pgEnum,
} from "drizzle-orm/pg-core";

export const newsletterCategoryEnum = pgEnum("newsletter_category", [
  "lawyer",
  "agrarian",
  "accountant",
]);

export const newsletterSubscribersTable = pgTable("newsletter_subscribers", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  categories: newsletterCategoryEnum("categories").array().notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
//які тематичін розслилоки ви хочете отримувати

// юристи бухгалера будівнитцо земля
// окремо семінар
