import Image from "next/image";

type PartnersCardProps = {
  image: string | null;
  link: string | null;
};

export default function PartnersCard({ image, link }: PartnersCardProps) {
  if (!image || !link) return null;

  return (
    <a href={link} target="_blank" rel="noopener noreferrer">
      <div className="relative h-40 w-full">
        <Image
          src={image}
          alt="Partner logo"
          fill
          className="object-contain"
          sizes="(max-width: 768px) 100vw, 300px"
        />
      </div>
    </a>
  );
}
