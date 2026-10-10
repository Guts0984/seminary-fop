"use client";

type PortableTextLinkProps = {
  children: React.ReactNode;
  value?: { href?: string; openInNewTab?: boolean };
};

export function PortableTextLink({ children, value }: PortableTextLinkProps) {
  const className =
    "text-primary underline decoration-primary/40 underline-offset-4 transition-colors hover:text-primary/60 hover:cursor-pointer hover:decoration-hover";

  if (value?.openInNewTab) {
    return (
      <a
        href={value.href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </a>
    );
  }

  return (
    <a
      href={value?.href}
      className={className}
      onClick={(e) => e.stopPropagation()}
    >
      {children}
    </a>
  );
}
