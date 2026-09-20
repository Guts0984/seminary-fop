import { defineField, defineType } from "sanity";

export const seoType = defineType({
  name: "seo",
  title: "SEO",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "SEO заголовок",
      description: "Якщо заповнено, замінить основний заголовок у метаданих",
      type: "string",
    }),
    defineField({
      name: "description",
      title: "SEO опис",
      description: "Якщо заповнено, замінить основний опис у метаданих",
      type: "text",
    }),
    defineField({
      name: "image",
      title: "SEO зображення",
      description: "Якщо заповнено, замінить основне зображення у og:image",
      type: "image",
      options: { hotspot: true },
    }),
  ],
});
