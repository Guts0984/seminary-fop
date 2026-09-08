import { sanityFetch } from "@/sanity/lib/live";
import { getSidebarSeminarsQuery } from "../queries/getSidebarSeminarsQuery";
import { nowBucket } from "../helpers/nowBucket";
import CategoriesSidebarList from "./CategoriesSidebarList";
import CategoriesMobileCarousel from "./CategoriesMobileCarousel";
import { Separator } from "@/components/ui/separator";
import { CategoriesWrapperProps } from "../types";

export default async function CategoriesWrapper({
  variant = "sidebar",
  filterType = "all",
}: CategoriesWrapperProps) {
  const { data } = await sanityFetch({
    query: getSidebarSeminarsQuery,
    params: {
      filterType,
      today: nowBucket().slice(0, 10),
    },
    stega: false,
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
