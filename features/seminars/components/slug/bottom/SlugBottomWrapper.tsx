import { GetSeminarBySlugResult } from "@/sanity/types";
import SlugSeminarBlueprint from "./SlugSeminarBlueprint";
import SlugSeminarMap from "./SlugSeminarMap";
import SeminarSlugRegisterField from "../SeminarSlugRegisterField";

export default function SlugBottomWrapper({
  seminar,
  registerNumbers,
  phone,
}: {
  seminar: GetSeminarBySlugResult;
  registerNumbers: string[];
  phone?: string | null;
}) {
  if (!seminar) {
    return null;
  }
  return (
    <div className=" space-y-2">
      <SlugSeminarBlueprint title={"Вартість участі"} content={seminar.price} />

      <SlugSeminarBlueprint title={"Знижки"} content={seminar.discount} />

      <SlugSeminarBlueprint
        title={"До вартості входить"}
        content={seminar.youGet}
      />

      <SlugSeminarBlueprint
        title={"Місце проведення"}
        content={seminar.location}
      />

      <SlugSeminarBlueprint title={"Розклад"} content={seminar.schedule} />

      <SeminarSlugRegisterField
        seminar={seminar}
        registerNumbers={registerNumbers}
        phone={phone}
        bottom={true}
      />

      <SlugSeminarMap seminar={seminar} />
    </div>
  );
}
