import { db } from "@/db";
import { seminarTable } from "../schemas/seminarTable";
import { eq } from "drizzle-orm";

export async function getSeminarBySlug(slug: string) {
  const [seminar] = await db
    .select()
    .from(seminarTable)
    .where(eq(seminarTable.slug, slug))
    .limit(1)
    .catch((error: unknown) => {
      console.error("Database crash:", error);
      throw new Error("Failed to find seminar from the database.", {
        cause: error,
      });
    });

  return seminar ?? null;
}
