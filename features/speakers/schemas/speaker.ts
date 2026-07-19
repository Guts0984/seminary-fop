import { defineType, defineField } from "sanity";
import { UserIcon } from "@sanity/icons/User";

export const speaker = defineType({
  name: "speaker",
  title: "Speaker",
  icon: UserIcon,
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Ім'я",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Слаг",
      type: "slug",
      options: {
        source: "name",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "title",
      title: "Посада / Заслуги",
      type: "array",
      of: [{ type: "string" }],
      description: "Голова правління, УКРБУДКОНСАЛТГРУП",
    }),
    defineField({
      name: "bio",
      title: "Біо (опціонально)",
      type: "text",
    }),
    defineField({
      name: "photo",
      title: "Фото (опціонально)",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "title.0",
      media: "photo",
    },
  },
});
