import { defineType, defineField } from "sanity";
import { CaseIcon } from "@sanity/icons/Case";
import { richTextBlock } from "@/sanity/helpers/richTextBlock";
import { imageBlock } from "@/sanity/helpers/imageBlock";

export const seminar = defineType({
  name: "seminar",
  title: "Seminar",
  icon: CaseIcon,
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Заголовок",
      type: "array",
      of: [richTextBlock({ headings: true, lists: false, quote: false })],
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "price",
      title: "Ціна",
      type: "array",
      of: [richTextBlock({ headings: false, lists: false, quote: false })],
    }),

    defineField({
      name: "partners",
      title: "Партнери",
      type: "array",
      of: [
        {
          type: "image",
          name: "partnerLogo",
          title: "Логотип партнера",
          options: { hotspot: true },
          fields: [
            { name: "alt", type: "string", title: "Alt текст" },
            {
              name: "link",
              type: "object",
              title: "Посилання",
              fields: [
                { name: "href", type: "url", title: "URL" },
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
      ],
      validation: (Rule) => Rule.max(10),
    }),

    defineField({
      name: "slug",
      title: "Слаг",
      type: "slug",
      options: {
        source: "category",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "description",
      title: "Текст",
      type: "array",
      of: [richTextBlock(), imageBlock],
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
      title: "Назва сайдбару",
      description: "Оберіть назву, що відобразиться у сайдбарі.",
      type: "string",
      validation: (Rule) => Rule.required(),
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

    defineField({
      name: "googleMap",
      title: "Карта (внизу сторінки)",
      type: "object",
      fields: [
        {
          name: "address",
          type: "string",
          title: "Адреса",
          description: "Наприклад: Київ, вул. Хрещатик, 1",
        },
        {
          name: "embedUrl",
          type: "url",
          title: "URL для вбудовування (опціонально)",
          description:
            'Якщо потрібна точна мітка: Google Maps → Поділитися → Вставити карту → скопіюйте посилання з src="..."',
        },
      ],
    }),
  ],
});
