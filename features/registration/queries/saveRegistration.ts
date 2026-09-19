"use server";

import { db } from "@/db";
import { sendRegistrationEmail } from "@/lib/email";
import { registrationSchema, RegistrationFormType } from "../schema";
import { registrationTable } from "../schemas/registrationTable";

export async function saveRegistration(data: RegistrationFormType) {
  const parsed = registrationSchema.safeParse(data);
  if (!parsed.success) {
    return { success: false, message: parsed.error.issues[0].message };
  }

  await db.insert(registrationTable).values(parsed.data);

  try {
    await sendRegistrationEmail(parsed.data);
  } catch (error) {
    console.error("Failed to send registration email", error);
  }

  return { success: true };
}
