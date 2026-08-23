import { sanityFetch } from "@/sanity/lib/live";
import { getSidebarSeminarsQuery } from "../queries/getSidebarSeminarsQuery";
import CategoriesSidebarList from "./CategoriesSidebarList";
import CategoriesMobileCarousel from "./CategoriesMobileCarousel";
import { Separator } from "@/components/ui/separator";

interface CategoriesWrapperProps {
  variant?: "sidebar" | "mobile";
}

type Category = {
  _id: string;
  category: string;
  slug: string | null;
};

export default async function CategoriesWrapper({
  variant = "sidebar",
}: CategoriesWrapperProps) {
  const { data } = await sanityFetch({
    query: getSidebarSeminarsQuery,
  });

  if (!data?.length) return null;

  if (variant === "mobile") {
    return <CategoriesMobileCarousel categories={data} />;
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h3 className="font-medium text-lg">Семінари / Вебінари</h3>
        <Separator className="data-horizontal:h-1 bg-primary" />
      </div>
      <CategoriesSidebarList categories={data} />
    </div>
  );
}
