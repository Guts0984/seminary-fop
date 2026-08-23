import { PortableTextComponents } from "next-sanity";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";

type BioImage = {
  _key?: string;
  alt?: string;
  caption?: string;
  widthPercent?: number;
};

export const imageBlockComponent: PortableTextComponents["types"] = {
  imageBlock: ({ value }) => {
    const images: BioImage[] = value?.images ?? [];
    if (!images.length) return null;

    const align = value.align ?? "center";
    const alignClass =
      align === "left" ? "mr-auto" : align === "right" ? "ml-auto" : "mx-auto";

    if (images.length === 1) {
      const img = images[0];
      const width = img.widthPercent ?? 100;

      return (
        <figure className={`my-6 ${alignClass}`} style={{ width: `${width}%` }}>
          <div className="relative aspect-video w-full overflow-hidden rounded-lg">
            <Image
              src={urlFor(img).width(1200).url()}
              alt={img.alt || ""}
              fill
              className="object-cover"
              sizes="100vw"
            />
          </div>
          {img.caption && (
            <figcaption className="mt-2 text-center text-sm text-muted-foreground">
              {img.caption}
            </figcaption>
          )}
        </figure>
      );
    }

    return (
      <div
        className="my-6 grid gap-3"
        style={{
          gridTemplateColumns: `repeat(${images.length}, minmax(0, 1fr))`,
        }}
      >
        {images.map((img, i) => (
          <figure key={img._key ?? i}>
            <div className="relative aspect-square w-full overflow-hidden rounded-lg">
              <Image
                src={urlFor(img).width(800).url()}
                alt={img.alt || ""}
                fill
                className="object-cover"
                sizes="50vw"
              />
            </div>
            {img.caption && (
              <figcaption className="mt-2 text-center text-sm text-muted-foreground">
                {img.caption}
              </figcaption>
            )}
          </figure>
        ))}
      </div>
    );
  },
};
