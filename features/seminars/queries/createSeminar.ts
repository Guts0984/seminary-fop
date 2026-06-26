"use server";

import { db } from "@/db";
import { InsertSeminarType, seminarTable } from "../schemas/seminarTable";

export async function createSeminar(
  params: InsertSeminarType | InsertSeminarType[],
) {
  const valuesToInsert = Array.isArray(params) ? params : [params];
  if (valuesToInsert.length === 0) {
    throw new Error("Failed to create seminar in database.");
  }
  const res = await db
    .insert(seminarTable)
    .values(valuesToInsert)
    .returning({
      id: seminarTable.id,
    })
    .catch((error: unknown) => {
      console.error("Database crash:", error);
      throw new Error("No seminars provided to insert.", {
        cause: error,
      });
    });

  return res;
}
