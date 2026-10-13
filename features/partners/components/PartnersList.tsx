import { client } from "@/sanity/lib/client";
import { sanityCacheOptions } from "@/sanity/lib/cache";
import { getPartnersQuery } from "../queries/getPartnersQuery";
import PartnersCard from "./PartnersCard";

export default async function PartnersList() {
  const partners = await client.fetch(getPartnersQuery, {}, sanityCacheOptions);

  if (!partners?.length) return null;

  return (
    <div className="flex flex-col w-full border-2 border-gray-200 rounded-xl overflow-hidden">
      <h3 className="w-full bg-graybg border-b-2 border-gray-200 px-3 py-2 font-medium text-md text-zinc-900">
        Партнери
      </h3>
      <ul className="flex flex-col gap-3 bg-white">
        {partners.map((partner) => (
          <li key={partner.link}>
            <PartnersCard image={partner.image} link={partner.link} />
          </li>
        ))}
      </ul>
    </div>
  );
}
