"use server";

import { db } from "@/db";
import { newsletterSubscribersTable } from "@/db/schema";
import { newsletterSchema } from "../schema";

export async function saveEmail(email: string) {
  const parsed = newsletterSchema.safeParse({ email });
  if (!parsed.success) {
    return { success: false, message: parsed.error.issues[0].message };
  }

  const result = await db
    .insert(newsletterSubscribersTable)
    .values({ email: parsed.data.email })
    .onConflictDoNothing()
    .returning({ id: newsletterSubscribersTable.id });

  if (result.length === 0) {
    return { success: false, message: "Ви вже підписані на цю розсилку" };
  }

  return { success: true };
}
