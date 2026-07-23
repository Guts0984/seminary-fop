import { defineField, defineType } from "sanity";
import { TagsIcon } from "@sanity/icons/Tags";

export const category = defineType({
  name: "category",
  title: "Category",
  type: "document",
  icon: TagsIcon,
  fields: [
    defineField({
      name: "title",
      title: "Назва категорії",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Слаг",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
    }),
  ],
});
