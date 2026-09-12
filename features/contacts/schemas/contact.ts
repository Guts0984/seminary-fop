import { defineField, defineType } from "sanity";
import { FeedbackIcon } from "@sanity/icons/Feedback";

export const contact = defineType({
  name: "contact",
  title: "Contact",
  icon: FeedbackIcon,
  type: "document",
  fields: [
    defineField({
      name: "phone",
      title: "Телефон",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "email",
      title: "E-mail",
      type: "string",
      validation: (rule) => rule.required().email(),
    }),
    defineField({
      name: "address",
      title: "Адреса",
      type: "object",
      fields: [
        defineField({ name: "title", title: "Текст адреси", type: "string" }),
        defineField({
          name: "mapsUrl",
          title: "Google Maps посилання",
          type: "url",
        }),
      ],
    }),
    defineField({
      name: "registerNumbers",
      title: "Телефони для запису",
      type: "array",
      of: [{ type: "string" }],
    }),
  ],
});
