type RichTextOptions = {
  headings?: boolean;
  lists?: boolean;
  quote?: boolean;
  alignment?: boolean;
  colors?: boolean;
};

export function richTextBlock(options: RichTextOptions = {}) {
  const {
    headings = true,
    lists = true,
    quote = true,
    alignment = true,
    colors = true,
  } = options;

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
      ...(alignment
        ? [
            { title: "По центру", value: "textCenter" },
            { title: "Праворуч", value: "textRight" },
          ]
        : []),
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
        ...(colors
          ? [
              {
                title: "Blue",
                value: "textPrimary",
                icon: () => (
                  <span style={{ color: "#00008b", fontWeight: 700 }}>A</span>
                ),
              },
              {
                title: "Red",
                value: "textSecondary",
                icon: () => (
                  <span style={{ color: "#740000", fontWeight: 700 }}>A</span>
                ),
              },
            ]
          : []),
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
