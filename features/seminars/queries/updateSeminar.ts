"use server";

import { db } from "@/db";
import { InsertSeminarType, seminarTable } from "../schemas/seminarTable";
import { eq } from "drizzle-orm";

export async function updateSeminar(
  id: number,
  params: Partial<InsertSeminarType>,
) {
  if (Object.keys(params).length === 0) {
    throw new Error("No fields provided to update.");
  }

  const [updatedRow] = await db
    .update(seminarTable)
    .set(params)
    .where(eq(seminarTable.id, id))
    .returning({ id: seminarTable.id })
    .catch((error: unknown) => {
      console.error("Database crash on update:", error);
      throw new Error("Failed to update seminar in database.", {
        cause: error,
      });
    });

  if (!updatedRow) {
    throw new Error("Seminar not found");
  }
  return updatedRow;
}
