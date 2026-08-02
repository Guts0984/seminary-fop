type RichTextOptions = {
  headings?: boolean;
  lists?: boolean;
  quote?: boolean;
};

export function richTextBlock(options: RichTextOptions = {}) {
  const { headings = true, lists = true, quote = true } = options;

  return {
    type: "block",
    styles: [
      { title: "Нормальний", value: "normal" },
      ...(headings
        ? [
            { title: "H2", value: "h2" },
            { title: "H3", value: "h3" },
          ]
        : []),
      ...(quote ? [{ title: "Quote", value: "blockquote" }] : []),
    ],
    lists: lists
      ? [
          { title: "Маркований", value: "bullet" },
          { title: "Нумерований", value: "number" },
        ]
      : [],
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
  };
}
