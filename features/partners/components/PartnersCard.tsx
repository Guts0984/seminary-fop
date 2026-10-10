import Image from "next/image";

type PartnersCardProps = {
  image: string | null;
  link: string | null;
};

export default function PartnersCard({ image, link }: PartnersCardProps) {
  if (!image || !link) return null;

  return (
    <a href={link} target="_blank" rel="noopener noreferrer">
      <Image
        src={image}
        alt="Partner logo"
        width={0}
        height={0}
        sizes="224px"
        className="block w-full h-auto"
      />
    </a>
  );
}
