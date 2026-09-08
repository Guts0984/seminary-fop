import CategoriesWrapper from "@/features/seminars/components/CategoriesWrapper";
import { FilterType } from "@/features/seminars/types";

export default function SidebarShell({
  filterType,
  children,
}: Readonly<{
  filterType?: FilterType;
  children: React.ReactNode;
}>) {
  return (
    <div className="flex gap-5">
      <aside className="w-56 shrink-0 hidden md:block space-y-8">
        <CategoriesWrapper filterType={filterType} />
      </aside>
      <main className="flex-1 min-w-0">{children}</main>
    </div>
  );
}
