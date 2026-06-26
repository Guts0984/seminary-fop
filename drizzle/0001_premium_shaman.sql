ALTER TABLE "seminars" ADD COLUMN "slug" text NOT NULL;--> statement-breakpoint
ALTER TABLE "seminars" ADD CONSTRAINT "seminars_slug_unique" UNIQUE("slug");