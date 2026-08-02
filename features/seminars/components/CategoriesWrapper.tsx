import { sanityFetch } from "@/sanity/lib/live";
import { getCategoriesQuery } from "../queries/getCategoriesQuery";
import CategoriesList from "./CategoriesList";
import { Separator } from "@/components/ui/separator";

export default async function CategoriesWrapper() {
  const { data } = await sanityFetch({
    query: getCategoriesQuery,
  });

  return (
    <aside className="w-56 shrink-0 hidden md:block space-y-6">
      <div className="space-y-2">
        <h3 className="font-medium text-xl">Категорії семінарів</h3>
        <Separator className="data-horizontal:h-1 bg-primary " />
      </div>
      <CategoriesList categories={data} />
    </aside>
  );
}
