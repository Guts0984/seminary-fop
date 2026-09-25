import { PortableTextComponents } from "next-sanity";
import { PortableTextLink } from "./PortableTextLink";

// Marks change weight/decoration/color only — never size or leading,
// so inline text never jumps out of the paragraph's rhythm.
export function createMarks(): PortableTextComponents["marks"] {
  return {
    strong: ({ children }) => (
      <strong className="font-semibold">{children}</strong>
    ),
    em: ({ children }) => <em className="italic">{children}</em>,
    underline: ({ children }) => (
      <span className="underline decoration-gray-400 underline-offset-4">
        {children}
      </span>
    ),
    code: ({ children }) => (
      <code className="rounded-md border border-gray-300 bg-gray-100 px-1.5 py-0.5 font-mono text-[0.85em] font-medium text-gray-900">
        {children}
      </code>
    ),
    link: ({ children, value }) => (
      <PortableTextLink value={value}>{children}</PortableTextLink>
    ),
  };
}
