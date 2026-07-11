import { z } from "zod";

export const newsletterSchema = z.object({
  email: z.email(),
});

export type NewsletterFormType = z.infer<typeof newsletterSchema>;
