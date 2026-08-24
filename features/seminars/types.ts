import { GetSeminarsQueryResult } from "@/sanity/types";
import { PortableTextBlock } from "next-sanity";

export type Seminar = NonNullable<GetSeminarsQueryResult["items"]>[number];

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

export type SeminarSpeaker = NonNullable<
  NonNullable<GetSeminarsQueryResult["items"]>[number]["speakers"]
>[number];
