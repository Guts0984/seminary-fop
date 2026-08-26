import { PortableTextComponents } from "next-sanity";
import { PortableTextLink } from "./PortableTextLink";

export function createMarks(): PortableTextComponents["marks"] {
  return {
    strong: ({ children }) => <strong className="font-bold">{children}</strong>,
    em: ({ children }) => <em className="italic">{children}</em>,
    underline: ({ children }) => (
      <span className="underline text-secondary decoration-secondary/50 underline-offset-4">
        {children}
      </span>
    ),
    code: ({ children }) => (
      <code className="rounded-md border border-secondary/20 bg-secondary/10 px-1.5 py-0.5 font-mono text-[0.85em] font-medium text-secondary">
        {children}
      </code>
    ),
    link: ({ children, value }) => (
      <PortableTextLink value={value}>{children}</PortableTextLink>
    ),
  };
}
