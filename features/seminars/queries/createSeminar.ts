"use server";

import { db } from "@/db";
import { InsertSeminarType, seminarTable } from "../schemas/seminarTable";

export async function createSeminar(
  params: InsertSeminarType | InsertSeminarType[],
) {
  const valuesToInsert = Array.isArray(params) ? params : [params];
  const res = await db
    .insert(seminarTable)
    .values(valuesToInsert)
    .returning({
      id: seminarTable.id,
    })
    .catch((error: unknown) => {
      console.error("Database crash:", error);
      throw new Error("Failed to create seminar in database.", {
        cause: error,
      });
    });

  return res;
}
