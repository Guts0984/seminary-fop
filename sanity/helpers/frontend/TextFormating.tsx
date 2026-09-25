import { PortableTextComponents } from "next-sanity";
import { imageBlockComponent } from "./imageBlockComponent";
import { createMarks } from "./marks";

const BASE_TEXT = "text-[13px] font-normal leading-[1.5] text-gray-900";

export const TextFormating: PortableTextComponents = {
  types: imageBlockComponent,
  block: {
    normal: ({ children }) => (
      <p className={`${BASE_TEXT} not-first:mt-1`}>{children}</p>
    ),
    h2: ({ children }) => (
      <h2 className="mt-1 text-base font-semibold leading-snug tracking-tight first:mt-0 text-primary hover:text-primary/85">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="mt-1 text-sm font-semibold leading-snug tracking-tight text-secondary first:mt-1">
        {children}
      </h3>
    ),
    blockquote: ({ children }) => (
      <blockquote
        className={`${BASE_TEXT} mt-1 border-l-2 border-primary/60 pl-3 italic text-gray-700`}
      >
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul
        className={`${BASE_TEXT} mt-1 ml-4 list-disc space-y-1 marker:text-gray-400`}
      >
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol
        className={`${BASE_TEXT} mt-1 ml-4 list-decimal space-y-1 marker:text-gray-400`}
      >
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => <li className="pl-1">{children}</li>,
    number: ({ children }) => <li className="pl-1">{children}</li>,
  },
  marks: createMarks(),
};
/**
 * Same marks as TextFormating, for rich text rendered inside a clickable
 * card or link — an inner <a> would nest anchors (invalid HTML, hydration
 * error), so link marks are rendered as plain text.
 */
export const InlineTextFormating: PortableTextComponents = {
  marks: {
    ...createMarks(),
    link: ({ children }) => <>{children}</>,
  },
};
