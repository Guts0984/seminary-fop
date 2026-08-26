import { PortableTextComponents } from "next-sanity";
import { imageBlockComponent } from "./imageBlockComponent";
import { createMarks } from "./marks";

/**
 * "Dense" / long-form variant — smaller, thinner type for bio-length
 * content (thousands of chars) where you need readability without
 * heavy visual weight. Same marks/list/image behavior as TextFormating.
 */
export const TextFormating: PortableTextComponents = {
  types: imageBlockComponent,
  block: {
    normal: ({ children }) => (
      <p className="text-[14px] font-normal leading-[1.7] text-foreground/90 not-first:mt-3">
        {children}
      </p>
    ),
    h2: ({ children }) => (
      <h2 className="mt-6 mb-2 text-base font-semibold leading-snug tracking-tight first:mt-0 text-primary hover:text-primary/85">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="mt-4 mb-1.5 text-sm font-semibold leading-snug tracking-tight text-secondary first:mt-0">
        {children}
      </h3>
    ),
    blockquote: ({ children }) => (
      <blockquote className="my-4 border-l-2 border-primary/60 pl-3 text-sm italic leading-relaxed text-foreground/70">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="my-1 ml-4 list-disc space-y-1 text-[14px] leading-relaxed marker:text-primary/70">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="my-3 ml-4 list-decimal space-y-1 text-[14px] leading-relaxed marker:text-primary/70">
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
