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
      title: "Біо",
      type: "array",
      of: [
        {
          type: "block",
          styles: [
            { title: "Нормальний", value: "normal" },
            { title: "H2", value: "h2" },
            { title: "H3", value: "h3" },
            { title: "Quote", value: "blockquote" },
          ],
          // 💡 ADDED: Lists support
          lists: [
            { title: "Маркований", value: "bullet" },
            { title: "Нумерований", value: "number" },
          ],
          marks: {
            decorators: [
              { title: "Bold", value: "strong" },
              { title: "Italic", value: "em" },
              { title: "Underline", value: "underline" },
              { title: "Code", value: "code" },
            ],
            annotations: [
              {
                name: "link",
                type: "object",
                title: "Посилання",
                fields: [
                  { name: "href", type: "url", title: "URL" },
                  // 💡 ADDED: Option to open in a new tab
                  {
                    name: "openInNewTab",
                    type: "boolean",
                    title: "Відкривати в новій вкладці",
                    initialValue: false,
                  },
                ],
              },
            ],
          },
        },
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            { name: "alt", type: "string", title: "Alt текст" },
            { name: "caption", type: "string", title: "Підпис" },

            {
              name: "size",
              type: "string",
              title: "Розмір зображення",
              options: {
                list: [
                  { title: "Маленьке (30%)", value: "small" },
                  { title: "Середнє (60%)", value: "medium" },
                  { title: "Повна ширина (100%)", value: "full" },
                ],
                layout: "radio",
              },
              initialValue: "full",
            },
            {
              name: "align",
              type: "string",
              title: "Вирівнювання",
              options: {
                list: [
                  { title: "Ліворуч", value: "left" },
                  { title: "По центру", value: "center" },
                  { title: "Праворуч", value: "right" },
                ],
                layout: "radio",
              },
              initialValue: "center",
            },
          ],
        },
      ],
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
