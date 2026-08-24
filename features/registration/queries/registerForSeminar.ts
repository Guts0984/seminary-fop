"use server";

import { db } from "@/db"; // your drizzle instance
import { registrationTable } from "@/features/registration/schemas/registrationTable";
import { z } from "zod";

const registrationSchema = z.object({
  fullName: z.string().min(2, "Введіть ім'я"),
  email: z.string().email("Некоректний email"),
  phone: z.string().min(10, "Некоректний номер телефону"),
  seminarSlug: z.string(),
});

export async function registerForSeminar(formData: unknown) {
  const validated = registrationSchema.parse(formData);

  await db.insert(registrationTable).values({
    fullName: validated.fullName,
    email: validated.email,
    phone: validated.phone,
    seminarSlug: validated.seminarSlug,
  });

  return { success: true };
}
