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
      type: "text",
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
      name: "price",
      title: "Ціна (опціонально)",
      type: "number",
      initialValue: 0,
      validation: (Rule) => Rule.min(0),
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
      title: "Категорія",
      type: "array",
      description: "Будівництво, податки...",
      of: [{ type: "string" }],
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
