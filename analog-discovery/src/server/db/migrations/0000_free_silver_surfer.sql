CREATE TABLE IF NOT EXISTS "note" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"note" varchar(255) NOT NULL,
	"createAt" date DEFAULT now(),
	CONSTRAINT "note_id_unique" UNIQUE("id")
);
