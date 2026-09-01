import { z } from "zod";

export const CATEGORY_VALUES = ["lawyer", "agrarian", "accountant"] as const;

export const categoryLabels: Record<(typeof CATEGORY_VALUES)[number], string> =
  {
    lawyer: "Юрист",
    agrarian: "Аграрник",
    accountant: "Бухгалтер",
  };

export const registrationSchema = z.object({
  seminarId: z.string().min(1, "Не вказано семінар"),
  name: z.string().trim().min(2, "Введіть ім'я контактної особи"),
  position: z.string().trim().min(2, "Вкажіть вашу посаду"),
  type: z.string().min(1, "Оберіть формат участі"),
  company: z.string().trim().min(2, "Вкажіть назву компанії"),
  address: z.string().trim().min(2, "Вкажіть адресу для відправки актів"),
  phone: z
    .string()
    .trim()
    .regex(/^\+?\d{9,15}$/, "Введіть коректний номер телефону"),
  email: z.email("Введіть коректну електронну адресу"),
  participants: z
    .array(z.string().trim().min(1, "Вкажіть ім'я учасника"))
    .min(1, "Оберіть хоча б одного учасника"),
});

export type RegistrationFormType = z.infer<typeof registrationSchema>;
