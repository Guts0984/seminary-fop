import { sanityFetch } from "@/sanity/lib/live";
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
      <CategoriesSidebarList categories={data} />
      <PartnersList />
    </div>
  );
}
