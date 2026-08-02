import { GetSpeakersQueryResult } from "@/sanity/types";
import Link from "next/link";

export default async function SpeakerList({
  data,
}: {
  data: GetSpeakersQueryResult;
}) {
  return (
    <div>
      {data.items.map((speaker) => (
        <div key={speaker._id}>
          <h3>{speaker.name}</h3>
          <p>{speaker.title}</p>
          <Link href={`/speakers/${speaker.slug}`}>Read more</Link>
        </div>
      ))}
    </div>
  );
}
