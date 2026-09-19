import { contact } from "@/features/contacts/schemas/contact";
import { partner } from "@/features/partners/schemas/partner";
import { seminar } from "@/features/seminars/schemas/seminar";
import { speaker } from "@/features/speakers/schemas/speaker";

export const schema = {
  types: [speaker, seminar, contact, partner],
};
