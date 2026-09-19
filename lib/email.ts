import { Resend } from "resend";

import { RegistrationFormType } from "@/features/registration/schema";

const resend = new Resend(process.env.RESEND_API_KEY);

const fields = (data: RegistrationFormType) =>
  [
    ["Семінар", data.seminarId],
    ["Ім'я", data.name],
    ["Посада", data.position],
    ["Формат участі", data.type],
    ["Компанія", data.company],
    ["Адреса", data.address],
    ["Телефон", data.phone],
    ["Email", data.email],
    ["Учасники", data.participants.join(", ")],
  ] as const;

export async function sendRegistrationEmail(data: RegistrationFormType) {
  const rows = fields(data)
    .map(
      ([label, value]) =>
        `<tr><td style="padding:4px 12px 4px 0;font-weight:600;vertical-align:top">${label}</td><td>${value}</td></tr>`,
    )
    .join("");

  await resend.emails.send({
    from: "Seminar <onboarding@resend.dev>",
    to: process.env.NOTIFY_EMAIL!,
    subject: `Нова реєстрація: ${data.name}`,
    html: `<h2 style="margin:0 0 12px">Нова реєстрація на семінар</h2><table style="border-collapse:collapse;font-family:sans-serif;font-size:14px">${rows}</table>`,
  });
}
