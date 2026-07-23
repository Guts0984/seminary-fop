import { seminar } from "@/features/seminars/schemas/seminar";
import { category } from "@/features/seminars/schemas/category";
import { speaker } from "@/features/speakers/schemas/speaker";

export const schema = {
  types: [speaker, seminar, category],
};
