import { defineQuery } from "next-sanity";
import { ImageResponse } from "next/og";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";

const ogImageQuery = defineQuery(`
  *[_id == $id && _type in ["seminar", "speaker"]][0]{
    "title": coalesce(
      seo.title,
      select(_type == "seminar" => pt::text(title), _type == "speaker" => name),
      ""
    ),
    "image": coalesce(
      seo.image,
      select(_type == "seminar" => image, _type == "speaker" => photo)
    ),
    "palette": coalesce(
      seo.image,
      select(_type == "seminar" => image, _type == "speaker" => photo)
    ).asset->metadata.palette
  }
`);

async function loadFont(text: string) {
  const url = `https://fonts.googleapis.com/css?family=Inter:wght@700&text=${encodeURIComponent(text)}`;
  const css = await (await fetch(url)).text();
  const resource = css.match(
    /src: url\((.+)\) format\('(opentype|truetype)'\)/,
  );
  if (!resource) {
    throw new Error("failed to load font data");
  }
  const response = await fetch(resource[1]);
  if (response.status !== 200) {
    throw new Error("failed to load font data");
  }
  return response.arrayBuffer();
}

function truncate(text: string, max: number) {
  return text.length > max ? `${text.slice(0, max - 1).trimEnd()}…` : text;
}

function titleFontSize(length: number) {
  if (length < 60) return 72;
  if (length < 120) return 56;
  return 40;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id) {
    return new Response("Missing id parameter", { status: 400 });
  }

  const data = await client.fetch(ogImageQuery, { id });

  if (!data) {
    return new Response("Not found", { status: 404 });
  }

  const vibrant = data.palette?.vibrant?.background ?? "#1e3a8a";
  const darkVibrant = data.palette?.darkVibrant?.background ?? "#0f172a";
  const text = truncate(data.title.trim(), 160);

  return new ImageResponse(
    (
      <div
        tw="flex w-full h-full relative"
        style={{
          background: `linear-gradient(135deg, ${vibrant} 0%, ${darkVibrant} 100%)`,
        }}
      >
        <div tw="flex flex-row w-full h-full">
          <div tw="flex-1 flex items-center px-14">
            <h1
              tw="text-white"
              style={{
                fontSize: titleFontSize(text.length),
                lineHeight: 1.15,
                letterSpacing: "-0.02em",
              }}
            >
              {text}
            </h1>
          </div>
          {data.image ? (
            <div tw="flex w-[440px] h-[630px] overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={urlFor(data.image).width(440).height(630).url()}
                alt=""
                tw="w-full h-full"
                style={{ objectFit: "cover" }}
              />
            </div>
          ) : null}
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: "Inter",
          data: await loadFont(text),
          weight: 700,
          style: "normal",
        },
      ],
    },
  );
}
