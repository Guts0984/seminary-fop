import { defineType, defineField } from "sanity";
import { AddUserIcon } from "@sanity/icons/AddUser";

export const partner = defineType({
  name: "partner",
  title: "Partner",
  icon: AddUserIcon,
  type: "document",
  fields: [
    defineField({
      name: "image",
      title: "Логотип",
      type: "image",
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "link",
      title: "Посилання",
      type: "url",
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: "image.alt",
      media: "image",
    },
  },
});
