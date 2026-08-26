import { GetSeminarBySlugResult } from "@/sanity/types";
import SlugSeminarBlueprint from "./SlugSeminarBlueprint";
import SlugSeminarMap from "./SlugSeminarMap";
import SeminarSlugRegisterField from "../SeminarSlugRegisterField";

export default function SlugBottomWrapper({
  seminar,
}: {
  seminar: GetSeminarBySlugResult;
}) {
  if (!seminar) {
    return null;
  }
  return (
    <div className="mt-5 space-y-4">
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

      <SeminarSlugRegisterField seminar={seminar} bottom={true} />

      <SlugSeminarMap seminar={seminar} />
    </div>
  );
}
