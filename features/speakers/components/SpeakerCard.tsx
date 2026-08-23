import Link from "next/link";
import { ArrowRight } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import type { GetSpeakersQueryResult } from "@/sanity/types";
import { PortableText } from "next-sanity";
import { Button } from "@/components/ui/button";

export type Speaker = NonNullable<GetSpeakersQueryResult["items"]>[number];
export type SpeakerSeminar = NonNullable<Speaker["seminars"]>[number];

function getInitials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}

function sizedImage(url: string, size: number) {
  return `${url}?w=${size}&h=${size}&fit=crop&auto=format`;
}

function seminarWord(count: number) {
  const mod10 = count % 10;
  const mod100 = count % 100;
  if (mod10 === 1 && mod100 !== 11) return "семінар";
  if ([2, 3, 4].includes(mod10) && ![12, 13, 14].includes(mod100)) {
    return "семінари";
  }
  return "семінарів";
}

export default function SpeakerCard({ speaker }: { speaker: Speaker }) {
  const { name, slug, title, photo, seminars } = speaker;
  const seminarCount = seminars?.length ?? 0;

  return (
    <Link
      href={`/speakers/${slug}`}
      className="group block pt-2 focus-visible:outline-none"
    >
      <Card
        className="relative overflow-visible border-2 border-muted pt-10 transition-all duration-300
                   group-hover:-translate-y-1 group-hover:border-primary/40 group-hover:shadow-lg
                   group-focus-visible:-translate-y-1 group-focus-visible:ring-2 group-focus-visible:ring-primary"
      >
        <CardHeader className="flex flex-col items-center gap-3 pb-0 text-center">
          <Avatar className="h-24 w-24 border-2 border-background ring-2 ring-muted transition-colors group-hover:ring-primary/40">
            {photo ? (
              <AvatarImage src={sizedImage(photo, 200)} alt={`Фото ${name}`} />
            ) : null}
            <AvatarFallback className="text-lg font-semibold bg-gray-200">
              {getInitials(name)}
            </AvatarFallback>
          </Avatar>

          <div className="space-y-1">
            <p className="text-xs font-medium uppercase tracking-widest text-secondary-foreground">
              Спікер
            </p>
            <h3 className="text-lg font-semibold leading-tight group-hover:text-primary">
              {name}
            </h3>
          </div>

          {seminarCount > 0 ? (
            <Badge className="font-normal">
              {seminarCount} {seminarWord(seminarCount)}
            </Badge>
          ) : null}
        </CardHeader>

        <CardContent className="pt-3">
          <div className="line-clamp-3 text-sm text-secondary-foreground [&_p]:mb-2 [&_p:last-child]:mb-0">
            <PortableText value={title} />
          </div>
        </CardContent>

        <CardFooter>
          <Button
            className="w-full gap-2 hover:cursor-pointer"
            variant="outline"
          >
            Дізнатися більше
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </CardFooter>
      </Card>
    </Link>
  );
}
