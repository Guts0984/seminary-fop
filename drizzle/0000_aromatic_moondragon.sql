CREATE TYPE "public"."seminar_status" AS ENUM('upcoming', 'past');--> statement-breakpoint
CREATE TABLE "seminars" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "seminars_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"title" text NOT NULL,
	"description" text,
	"speakers" varchar(255)[] DEFAULT '{}'::varchar[] NOT NULL,
	"thumbnail" text,
	"type" varchar(50)[] DEFAULT '{}'::varchar[] NOT NULL,
	"status" "seminar_status" NOT NULL,
	"category" varchar(100)[] DEFAULT '{}'::varchar[] NOT NULL,
	"event_date" timestamp NOT NULL,
	"price" integer DEFAULT 0 NOT NULL,
	"location" text DEFAULT '' NOT NULL
);
