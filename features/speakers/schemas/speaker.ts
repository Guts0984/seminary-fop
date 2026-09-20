import { defineType, defineField } from "sanity";
import { UserIcon } from "@sanity/icons/User";
import { richTextBlock } from "@/sanity/helpers/richTextBlock";
import { imageBlock } from "@/sanity/helpers/imageBlock";

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
      name: "bio",
      title: "Біо",
      type: "array",
      of: [richTextBlock(), imageBlock],
    }),

    defineField({
      name: "title",
      title: "Короткий опис заслуг",
      type: "array",
      of: [richTextBlock({ headings: false, lists: false, quote: false })],
    }),

    defineField({
      name: "photo",
      title: "Фото (опціонально)",
      type: "image",
      options: {
        hotspot: true,
      },
    }),

    defineField({
      name: "seo",
      title:
        "SEO (Заповнювати лише у випадку, коли потрібно переписати створену автоматичну інформацію, в інших випадках лишити пусті поля)",
      type: "seo",
    }),
  ],
  preview: {
    select: {
      title: "name",
      media: "photo",
    },
  },
});
