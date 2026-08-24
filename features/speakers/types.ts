import { GetSpeakersQueryResult } from "@/sanity/types";

export type Speaker = NonNullable<GetSpeakersQueryResult["items"]>[number];
