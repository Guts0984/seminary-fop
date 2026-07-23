import { defineType, defineField } from "sanity";
import { CaseIcon } from "@sanity/icons/Case";

export const seminar = defineType({
  name: "seminar",
  title: "Seminar",
  icon: CaseIcon,
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Заголовок",
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
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Текст",
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
      name: "eventDates",
      title: "Дата(и) проведення",
      type: "array",
      of: [{ type: "datetime" }],
      validation: (Rule) => Rule.required().min(1),
      description: "Додайте перелік дат проведення семінарів.",
    }),
    defineField({
      name: "location",
      title: "Місце проведення (опціонально)",
      type: "string",
      initialValue: "",
    }),
    defineField({
      name: "status",
      title: "Статус",
      type: "string",
      options: {
        list: [
          { title: "Наближається", value: "upcoming" },
          { title: "Пройшов", value: "past" },
          { title: "Запис", value: "recording" },
        ],
        layout: "radio",
      },
      initialValue: "upcoming",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "type",
      title: "Тип заходу",
      type: "array",
      of: [{ type: "string" }],
      options: {
        list: [
          { title: "Семінар", value: "seminar" },
          { title: "Вебінар", value: "webinar" },
          { title: "Запис", value: "recording" },
        ],
      },
    }),
    defineField({
      name: "category",
      title: "Категорії",
      type: "array",
      of: [{ type: "reference", to: [{ type: "category" }] }],
    }),
    defineField({
      name: "speakers",
      title: "Спікери",
      type: "array",
      of: [{ type: "reference", to: [{ type: "speaker" }] }],
    }),
    defineField({
      name: "image",
      title: "Фото",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
  ],
});
