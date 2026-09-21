import { client } from "@/sanity/lib/client";
import { sanityCacheOptions } from "@/sanity/lib/cache";
import { getSidebarSeminarsQuery } from "../queries/getSidebarSeminarsQuery";
import { nowBucket } from "../helpers/nowBucket";
import CategoriesSidebarList from "./CategoriesSidebarList";
import CategoriesMobileCarousel from "./CategoriesMobileCarousel";
import { CategoriesWrapperProps } from "../types";
import PartnersList from "@/features/partners/components/PartnersList";

export default async function CategoriesWrapper({
  variant = "sidebar",
  filterType = "all",
}: CategoriesWrapperProps) {
  const data = await client.fetch(
    getSidebarSeminarsQuery,
    {
      filterType,
      today: nowBucket().slice(0, 10),
    },
    sanityCacheOptions,
  );

  if (!data?.length) return null;

  if (variant === "mobile") {
    return <CategoriesMobileCarousel categories={data} />;
  }

  return (
    <div className="space-y-6">
      <CategoriesSidebarList categories={data} />
      <PartnersList />
    </div>
  );
}
