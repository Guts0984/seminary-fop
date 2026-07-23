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
  const activeCategories =
    searchParams.get("category")?.split(",").filter(Boolean) ?? [];

  const handleClick = (slug: string) => {
    const params = new URLSearchParams(searchParams.toString());
    const current = params.get("category")?.split(",").filter(Boolean) ?? [];

    const next = current.includes(slug)
      ? current.filter((s) => s !== slug) // already selected -> remove it
      : [...current, slug]; // not selected -> add it

    if (next.length > 0) {
      params.set("category", next.join(","));
    } else {
      params.delete("category");
    }

    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((category) => {
        const isActive = category.slug
          ? activeCategories.includes(category.slug)
          : false;

        return (
          <button
            key={category._id}
            onClick={() => category.slug && handleClick(category.slug)}
            className={`${
              isActive
                ? "bg-primary text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            } px-3 py-2 rounded-2xl text-sm cursor-pointer transition-colors`}
          >
            {category.title}
          </button>
        );
      })}
    </div>
  );
}
