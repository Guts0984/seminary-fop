"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";

type Category = {
  _id: string;
  title: string;
  slug: string | null;
};

export default function CategoriesList({
  categories,
}: {
  categories: Category[];
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const activeSlug = searchParams.get("category");

  const handleClick = (slug: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (activeSlug === slug) {
      params.delete("category"); // click again to clear filter
    } else {
      params.set("category", slug);
    }
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div>
      {categories.map((category) => (
        <button
          key={category._id}
          onClick={() => category.slug && handleClick(category.slug)}
          data-active={activeSlug === category.slug}
        >
          {category.title}
        </button>
      ))}
    </div>
  );
}
