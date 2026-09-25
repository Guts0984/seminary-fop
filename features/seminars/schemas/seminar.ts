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
      of: [richTextBlock()],
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "subtitle",
      title: "Підзаголовок (для огляду, короткий опис)",
      type: "array",
      of: [richTextBlock()],
    }),
    defineField({
      name: "subtitle_main",
      title: "Підзаголовок (для слагу, довгий опис)",
      type: "array",
      of: [richTextBlock()],
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
      name: "category",
      title: "Назва сайдбару",
      description: "Оберіть назву, що відобразиться у сайдбарі.",
      type: "string",
      validation: (Rule) => Rule.required(),
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
      title: "Програма",
      type: "array",
      of: [richTextBlock(), imageBlock],
    }),
    defineField({
      name: "price",
      title: "Ціна",
      type: "array",
      of: [richTextBlock({ headings: false, lists: false, quote: false })],
    }),
    defineField({
      name: "discount",
      title: "Знижки",
      type: "array",
      of: [richTextBlock(), imageBlock],
    }),
    defineField({
      name: "youGet",
      title: "До вартості входить:",
      type: "array",
      of: [richTextBlock(), imageBlock],
    }),
    defineField({
      name: "youGetRight",
      title: "До вартості входить (права колонка)",
      description:
        "Якщо заповнено, блок відобразиться у дві колонки 50/50: основний текст зліва, цей — справа",
      type: "array",
      of: [richTextBlock(), imageBlock],
    }),

    defineField({
      name: "eventDates",
      title: "Дата(и) проведення",
      type: "array",
      of: [{ type: "date" }],
      validation: (Rule) => Rule.required().min(1),
      description: "Додайте перелік дат проведення семінарів.",
    }),

    defineField({
      name: "schedule",
      title: "Розклад",
      type: "array",
      of: [richTextBlock()],
    }),
    defineField({
      name: "eventTime",
      title: "Час проведення",
      type: "string",
      description: "Наприклад: 10:00 - 13:00",
      validation: (Rule) =>
        Rule.regex(
          /^([01]\d|2[0-3]):[0-5]\d(\s*-\s*([01]\d|2[0-3]):[0-5]\d)?$/,
          {
            name: "time format",
          },
        ).error("Формат: 10:00 або 10:00 - 13:00"),
    }),

    defineField({
      name: "location",
      title: "Місце проведення",
      type: "array",
      of: [richTextBlock()],
    }),

    defineField({
      name: "type",
      title: "Тип заходу (всі в архіві автоматично стають записами)",
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
      name: "speakers",
      title: "Спікери",
      type: "array",
      of: [{ type: "reference", to: [{ type: "speaker" }] }],
    }),

    defineField({
      name: "speakerLayout",
      title: "Розташування спікерів",
      type: "string",
      options: {
        list: [
          { title: "1 в рядку", value: "1" },
          { title: "Безліч", value: "2" },
        ],
        layout: "radio",
        direction: "vertical",
      },
      initialValue: "2",
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
      type: "url",
      description:
        'Google Maps → Поділитися → Вставити карту → скопіюйте посилання з src="..."',
      validation: (Rule) =>
        Rule.uri({ scheme: ["https"] }).custom((value) => {
          if (!value) return true;
          return value.includes("/maps/embed")
            ? true
            : 'Потрібне посилання для вбудовування (з src="..."), а не звичайне посилання на карту.';
        }),
    }),

    defineField({
      name: "seo",
      title:
        "SEO (Заповнювати лише у випадку, коли потрібно переписати створену автоматичну інформацію, в інших випадках лишити пусті поля)",
      type: "seo",
    }),
  ],
});
