import { client } from "@/sanity/lib/client";
import { sanityCacheOptions } from "@/sanity/lib/cache";
import { getPartnersQuery } from "../queries/getPartnersQuery";
import PartnersCard from "./PartnersCard";

export default async function PartnersList() {
  const partners = await client.fetch(getPartnersQuery, {}, sanityCacheOptions);

  if (!partners?.length) return null;

  return (
    <ul className="space-y-4">
      {partners.map((partner) => (
        <li key={partner.link}>
          <PartnersCard image={partner.image} link={partner.link} />
        </li>
      ))}
    </ul>
  );
}
