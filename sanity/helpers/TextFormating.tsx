import { PortableTextComponents } from "next-sanity";

export const TextFormating: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="text-[18px] font-normal leading-relaxed text-foreground">
        {children}
      </p>
    ),
    h2: ({ children }) => (
      <p className="text-lg font-bold leading-relaxed">{children}</p>
    ),
    h3: ({ children }) => (
      <p className="text-base font-bold leading-relaxed">{children}</p>
    ),
    blockquote: ({ children }) => (
      <p className="border-l-2 border-primary pl-2 italic opacity-80">
        {children}
      </p>
    ),
  },
  marks: {
    strong: ({ children }) => (
      <strong className="font-bold text-secondary">{children}</strong>
    ),
    em: ({ children }) => <em className="italic">{children}</em>,
    underline: ({ children }) => (
      <span className="underline underline-offset-2">{children}</span>
    ),
    code: ({ children }) => (
      <code className="rounded bg-neutral-100 px-1 py-0.5 font-mono text-[13px] text-secondary">
        {children}
      </code>
    ),
    link: ({ children, value }) => (
      <span
        className="text-secondary underline decoration-indigo-300 underline-offset-2 transition-colors hover:text-hover hover:decoration-hover"
        onClick={(e) => e.stopPropagation()}
      >
        {value?.openInNewTab ? (
          <a href={value.href} target="_blank" rel="noopener noreferrer">
            {children}
          </a>
        ) : (
          <a href={value?.href}>{children}</a>
        )}
      </span>
    ),
  },
};
