import CategoriesWrapper from "@/features/seminars/components/CategoriesWrapper";

export default function Sidebar() {
  return (
    <aside className="w-56 shrink-0 hidden md:block space-y-8">
      <CategoriesWrapper />
    </aside>
  );
}
