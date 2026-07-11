import { z } from "zod";

export const CATEGORY_VALUES = ["lawyer", "agrarian", "accountant"] as const;

export const categoryLabels: Record<(typeof CATEGORY_VALUES)[number], string> =
  {
    lawyer: "Юрист",
    agrarian: "Аграрник",
    accountant: "Бухгалтер",
  };

export const newsletterSchema = z.object({
  email: z.email(),
  categories: z
    .array(z.enum(CATEGORY_VALUES))
    .min(1, "Оберіть хоча б одну категорію"),
});

export type NewsletterFormType = z.infer<typeof newsletterSchema>;
