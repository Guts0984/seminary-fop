import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TextFormating } from "@/sanity/helpers/frontend/TextFormating";
import { PortableText } from "next-sanity";
import { ComponentProps } from "react";

type PortableTextValue = ComponentProps<typeof PortableText>["value"];

export default function SlugSeminarBlueprint({
  title,
  content,
  contentRight,
}: {
  title: string | null;
  content: PortableTextValue;
  contentRight?: PortableTextValue;
}) {
  if (!title || !content) {
    return null;
  }

  const hasRightColumn = Array.isArray(contentRight) && contentRight.length > 0;

  return (
    <Card className="border-2 border-border rounded-xl overflow-hidden p-0 gap-0">
      <CardHeader className="bg-primary/75 rounded-t-[10px] px-3 py-2">
        <CardTitle className=" font-bold text-white">{title}</CardTitle>
      </CardHeader>
      <CardContent className=" font-semibold text-foreground">
        {hasRightColumn ? (
          <div className="flex justify-between">
            <div>
              <PortableText value={content} components={TextFormating} />
            </div>
            <div>
              <PortableText value={contentRight} components={TextFormating} />
            </div>
          </div>
        ) : (
          <div>
            <PortableText value={content} components={TextFormating} />
          </div>
        )}
      </CardContent>
    </Card>
  );
}
