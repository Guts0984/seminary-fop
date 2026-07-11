"use server";

import { db } from "@/db";
import { newsletterSubscribersTable } from "@/db/schema";
import { newsletterSchema, NewsletterFormType } from "../schema";

export async function saveEmail(data: NewsletterFormType) {
  const parsed = newsletterSchema.safeParse(data);
  if (!parsed.success) {
    return { success: false, message: parsed.error.issues[0].message };
  }

  const result = await db
    .insert(newsletterSubscribersTable)
    .values({ email: parsed.data.email, categories: parsed.data.categories })
    .onConflictDoNothing()
    .returning({ id: newsletterSubscribersTable.id });

  if (result.length === 0) {
    return { success: false, message: "Ви вже підписані на цю розсилку" };
  }

  return { success: true };
}
