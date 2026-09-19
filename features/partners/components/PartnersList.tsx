import { sanityFetch } from "@/sanity/lib/live";
import { getPartnersQuery } from "../queries/getPartnersQuery";
import PartnersCard from "./PartnersCard";

export default async function PartnersList() {
  const { data: partners } = await sanityFetch({
    query: getPartnersQuery,
    stega: false,
  });

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
