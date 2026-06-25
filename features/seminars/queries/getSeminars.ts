import { db } from "@/db";
import { seminarTable } from "../schemas/seminarTable";
import { and, arrayOverlaps } from "drizzle-orm";

export interface SeminarFilters {
  type?: ("seminar" | "webinar" | "recording")[];
  category?: string[];
}

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function getSeminars(filters?: SeminarFilters) {
  await delay(1000);

  const conditions = [];

  if (filters?.type && filters.type.length > 0) {
    conditions.push(arrayOverlaps(seminarTable.type, filters.type));
  }
  if (filters?.category && filters.category.length > 0) {
    conditions.push(arrayOverlaps(seminarTable.category, filters.category));
  }

  const res = await db
    .select()
    .from(seminarTable)
    .where(conditions.length > 0 ? and(...conditions) : undefined);

  return res;
}
