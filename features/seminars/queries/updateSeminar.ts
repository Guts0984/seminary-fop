import { db } from "@/db";
import { InsertSeminarType, seminarTable } from "../schemas/seminarTable";
import { eq } from "drizzle-orm";

export async function updateSeminar(
  id: number,
  params: Partial<InsertSeminarType>,
) {
  const [updatedRow] = await db
    .update(seminarTable)
    .set(params)
    .where(eq(seminarTable.id, id))
    .returning({ id: seminarTable.id });

  if (!updatedRow) {
    throw new Error("Seminar not found or nothing changed.");
  }
  return updatedRow;
}
