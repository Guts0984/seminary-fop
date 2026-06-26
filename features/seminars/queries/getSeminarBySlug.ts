import { db } from "@/db";
import { seminarTable } from "../schemas/seminarTable";
import { eq } from "drizzle-orm";

export async function getSeminarBySlug(slug: string) {
  const res = await db
    .select()
    .from(seminarTable)
    .where(eq(seminarTable.slug, slug))
    .limit(1);

  if (res.length === 0) {
    return null;
  }
  return res[0];
}
