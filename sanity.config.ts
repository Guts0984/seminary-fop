"use client";

import { Trees, UsersIcon, ScrollText } from "lucide-react";
import { theme } from "./theme";
import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { ukUALocale } from "@sanity/locale-uk-ua";

// Go to https://www.sanity.io/docs/api-versioning to learn how API versioning works
import { apiVersion, dataset, projectId } from "./sanity/env";
import { schema } from "./sanity/schemaTypes";
import { structure } from "./sanity/structure";
import { NewsletterSubscribersTool } from "./sanity/tools/NewsletterSubscribersTool";
import { SeminarRegistrationsTool } from "./sanity/tools/SeminarRegistrationsTool";

export default defineConfig({
  basePath: "/studio",
  icon: Trees,
  projectId,
  dataset,
  schema,
  theme,
  plugins: [
    structureTool({ structure }),
    visionTool({ defaultApiVersion: apiVersion }),
    ukUALocale(),
  ],
  tools: [
    {
      name: "newsletter-subscribers",
      title: "Підписники",
      icon: UsersIcon,
      component: NewsletterSubscribersTool,
    },
    {
      name: "seminar-registrations",
      title: "Реєстрації",
      icon: ScrollText,
      component: SeminarRegistrationsTool,
    },
  ],
});
