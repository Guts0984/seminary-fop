export type FilterType = "all" | "upcoming" | "past";

export type CategoriesWrapperProps = {
  variant?: "sidebar" | "mobile";
  filterType?: FilterType;
};

export type SeminarSearchParams = {
  category?: string;
  start?: number;
  end?: number;
  filterType?: FilterType;
};
