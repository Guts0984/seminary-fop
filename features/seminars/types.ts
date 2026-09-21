import { GetSeminarsQueryResult } from "@/sanity/types";

export type Seminar = NonNullable<GetSeminarsQueryResult["items"]>[number];

export type FilterType = "all" | "upcoming" | "past";

export type CategoriesWrapperProps = {
  variant?: "sidebar" | "mobile";
  filterType?: FilterType;
};

export type SeminarSpeaker = NonNullable<
  NonNullable<GetSeminarsQueryResult["items"]>[number]["speakers"]
>[number];

export type SeminarType = "seminar" | "webinar" | "recording";
