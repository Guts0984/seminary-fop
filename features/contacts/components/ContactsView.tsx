"use client";

import Link from "next/link";
import { Clock, Mail, MapPin, Phone, Copy } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { copyToClipboard } from "@/helpers/copyToClipboard";
import { Separator } from "@/components/ui/separator";
import { GetContactQueryResult } from "@/sanity/types";

export default function ContactsView({
  contact,
}: {
  contact: GetContactQueryResult;
}) {
  const registerNumbers = contact?.registerNumbers ?? [];
  const mapUrl = contact?.address?.mapsUrl ?? "";

  return (
    <div className="space-y-4">
      <div className="space-y-2 text-center sm:text-left">
        <div className="space-y-2">
          <h3 className="font-medium text-lg">Контакти</h3>
          <Separator className="data-horizontal:h-1 bg-primary max-w-25" />
          <p className="text-secondary-foreground text-sm">
            Зв&apos;яжіться з нами для реєстрації або отримання консультації.
          </p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 items-stretch">
        {/* Left Column: Office & Phone */}
        <div className="flex flex-col gap-6">
          {/* Office Address */}
          <Card className="flex flex-col flex-1">
            <CardHeader className="flex flex-row items-center gap-3 pb-2">
              <MapPin className="w-5 h-5 text-primary shrink-0" />
              <CardTitle className="text-lg">Офіс</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col justify-between flex-1 space-y-3">
              <p className="text-sm text-foreground/90 leading-relaxed">
                {contact?.address?.title}
              </p>
              {contact?.address?.mapsUrl && (
                <div>
                  <Link
                    href={contact.address.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button
                      variant="outline"
                      size="sm"
                      className="gap-2 text-primary border-primary/30 hover:bg-primary/5 cursor-pointer"
                    >
                      <MapPin className="w-4 h-4" />
                      <span>Відкрити в Google Maps</span>
                    </Button>
                  </Link>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Phone Numbers */}
          <Card className="flex flex-col flex-1">
            <CardHeader className="flex flex-row items-center gap-3 pb-2">
              <Phone className="w-5 h-5 text-primary shrink-0" />
              <CardTitle className="text-lg">Телефон</CardTitle>
            </CardHeader>
            <CardContent className="flex-1">
              <div className="flex flex-col gap-2">
                {registerNumbers.map((number: string) => (
                  <div
                    key={number}
                    className="flex items-center gap-2 group rounded-md p-1.5 hover:bg-muted/50 transition-colors"
                  >
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => copyToClipboard(number)}
                      className="h-8 w-8 shrink-0 text-muted-foreground hover:text-primary cursor-pointer"
                      title="Скопіювати"
                    >
                      <Copy className="w-4 h-4" />
                    </Button>
                    <a
                      href={`tel:${number}`}
                      className="text-sm font-medium hover:text-primary transition-colors"
                    >
                      {number}
                    </a>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Working Hours & Email */}
        <div className="flex flex-col gap-6">
          {/* Working Hours */}
          <Card className="flex flex-col flex-1">
            <CardHeader className="flex flex-row items-center gap-3 pb-2">
              <Clock className="w-5 h-5 text-primary shrink-0" />
              <CardTitle className="text-lg">Графік роботи</CardTitle>
            </CardHeader>
            <CardContent className="space-y-1 text-sm text-foreground/90 flex-1">
              <p>
                <span className="font-semibold">Пн – Пт:</span> 09:00 – 18:00
              </p>
              <p>
                <span className="font-semibold">Сб – Нд:</span> Вихідний
              </p>
            </CardContent>
          </Card>

          {/* Email */}
          {contact?.email && (
            <Card className="flex flex-col flex-1">
              <CardHeader className="flex flex-row items-center gap-3 pb-2">
                <Mail className="w-5 h-5 text-primary shrink-0" />
                <CardTitle className="text-lg">E-mail</CardTitle>
              </CardHeader>
              <CardContent className="flex items-center gap-2 flex-1">
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => copyToClipboard(contact.email)}
                  className="h-8 w-8 shrink-0 text-muted-foreground hover:text-primary cursor-pointer"
                  title="Скопіювати"
                >
                  <Copy className="w-4 h-4" />
                </Button>
                <a
                  href={`mailto:${contact.email}`}
                  className="text-sm font-medium hover:text-primary hover:underline transition-colors"
                >
                  {contact.email}
                </a>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Google Maps Embed with Pin Point */}
      <Card className="overflow-hidden border-2 border-primary/20">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <MapPin className="w-5 h-5 text-primary" />
            <span>Розташування на карті</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0 h-[400px] w-full relative">
          <iframe
            title="Офіс на карті"
            src={mapUrl}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen={false}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full h-full"
          />
        </CardContent>
      </Card>
    </div>
  );
}
