import { defineType, defineField } from "sanity";
import { CaseIcon } from "@sanity/icons/Case";

const imageCommonFields = [
  { name: "alt", type: "string", title: "Alt текст" },
  { name: "caption", type: "string", title: "Підпис" },
];

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
      of: [
        {
          type: "block",
          styles: [
            { title: "Нормальний", value: "normal" },
            { title: "H2", value: "h2" },
            { title: "H3", value: "h3" },
            { title: "Quote", value: "blockquote" },
          ],
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
      ],
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "price",
      title: "Ціна",
      type: "array",
      of: [
        {
          type: "block",
          styles: [{ title: "Нормальний", value: "normal" }],
          marks: {
            decorators: [
              { title: "Bold", value: "strong" },
              { title: "Italic", value: "em" },
            ],
            annotations: [],
          },
        },
      ],
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
        // Single standalone image — full-width by default, editor can shrink it if needed
        {
          type: "image",
          name: "image",
          title: "Одне зображення",
          options: { hotspot: true },
          fields: [
            ...imageCommonFields,
            {
              name: "widthPercent",
              type: "number",
              title: "Ширина (%)",
              validation: (Rule) => Rule.min(10).max(100),
              initialValue: 100,
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
        // Multiple images in one row — no width field at all, they split evenly automatically
        {
          type: "object",
          name: "imageRow",
          title: "Ряд зображень",
          fields: [
            {
              name: "images",
              title: "Зображення",
              type: "array",
              of: [
                {
                  type: "image",
                  options: { hotspot: true },
                  fields: imageCommonFields,
                },
              ],
              validation: (Rule) => Rule.min(2).max(10),
            },
          ],
          preview: {
            select: { images: "images" },
            prepare({ images }) {
              return { title: `Ряд зображень (${images?.length || 0})` };
            },
          },
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

    // Fixed field — always rendered at the bottom of the page, not part of the flowing content
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
