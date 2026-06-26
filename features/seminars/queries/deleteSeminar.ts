"use server";

import { db } from "@/db";
import { seminarTable } from "../schemas/seminarTable";
import { eq } from "drizzle-orm";

export async function deleteSeminarById(id: number) {
  const [deletedRow] = await db
    .delete(seminarTable)
    .where(eq(seminarTable.id, id))
    .returning({ id: seminarTable.id })
    .catch((error: unknown) => {
      console.error("Database crash:", error);
      throw new Error("Failed to delete seminar from the database.", {
        cause: error,
      });
    });

  if (!deletedRow) {
    throw new Error("Seminar not found or already deleted.");
  }

  return { success: true };
}
