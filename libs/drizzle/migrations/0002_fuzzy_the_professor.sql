CREATE TABLE IF NOT EXISTS "app_role" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"permissions" text[],
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp DEFAULT now()
);
--> statement-breakpoint
ALTER TABLE "snacks" ALTER COLUMN "expiryDate" SET DEFAULT '2024-07-11 09:16:47.729';--> statement-breakpoint
ALTER TABLE "snacks" ADD COLUMN "cost" integer DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE "app_user" ADD COLUMN "roleId" uuid;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "app_user" ADD CONSTRAINT "app_user_roleId_app_role_id_fk" FOREIGN KEY ("roleId") REFERENCES "public"."app_role"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "snacks" DROP COLUMN IF EXISTS "price";