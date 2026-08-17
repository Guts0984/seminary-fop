import { defineField } from "sanity";

export const imageBlock = defineField({
  type: "object",
  name: "imageBlock",
  title: "Зображення",
  fields: [
    defineField({
      name: "images",
      title: "Зображення",
      type: "array",
      of: [
        defineField({
          type: "image",
          name: "image",
          title: "Зображення",
          options: { hotspot: true },
          fields: [
            defineField({
              name: "alt",
              type: "string",
              title: "Alt текст",
            }),
            defineField({
              name: "caption",
              type: "string",
              title: "Підпис",
            }),
            defineField({
              name: "widthPercent",
              type: "number",
              title: "Ширина (%)",
              description:
                "Діє лише якщо зображення в блоці одне. Кілька зображень діляться порівну автоматично.",
              validation: (Rule) => Rule.min(1).max(100),
              initialValue: 100,
            }),
          ],
        }),
      ],
      validation: (Rule) => Rule.min(1).max(10),
    }),
    defineField({
      name: "align",
      title: "Вирівнювання",
      type: "string",
      description: "Діє лише якщо зображення в блоці одне.",
      options: {
        list: [
          { title: "Ліворуч", value: "left" },
          { title: "По центру", value: "center" },
          { title: "Праворуч", value: "right" },
        ],
        layout: "radio",
      },
      initialValue: "center",
    }),
  ],
  preview: {
    select: { images: "images" },
    prepare({ images }) {
      const count = images?.length || 0;
      return {
        title: count === 1 ? "Зображення (1)" : `Ряд зображень (${count})`,
      };
    },
  },
});
