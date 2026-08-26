import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TextFormating } from "@/sanity/helpers/frontend/TextFormating";
import { PortableText } from "next-sanity";
import { ComponentProps } from "react";

type PortableTextValue = ComponentProps<typeof PortableText>["value"];

export default function SlugSeminarBlueprint({
  title,
  content,
}: {
  title: string | null;
  content: PortableTextValue;
}) {
  if (!title || !content) {
    return null;
  }

  return (
    <Card className="border-2 border-border bg-primary/10">
      <CardHeader>
        <CardTitle className="text-lg font-bold text-primary">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="text-xl font-semibold text-foreground">
        <PortableText value={content} components={TextFormating} />
      </CardContent>
    </Card>
  );
}
