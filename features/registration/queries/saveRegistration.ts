"use server";

import { db } from "@/db";
import { registrationSchema, RegistrationFormType } from "../schema";
import { registrationTable } from "../schemas/registrationTable";

export async function saveRegistration(data: RegistrationFormType) {
  const parsed = registrationSchema.safeParse(data);
  if (!parsed.success) {
    return { success: false, message: parsed.error.issues[0].message };
  }

  await db.insert(registrationTable).values(parsed.data);

  return { success: true };
}
