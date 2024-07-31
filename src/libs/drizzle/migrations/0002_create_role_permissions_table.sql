CREATE TABLE IF NOT EXISTS "app_permissions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "app_role_permissions" (
	"role_id" uuid,
	"permission_id" uuid
);
--> statement-breakpoint
ALTER TABLE "app_role" RENAME TO "app_roles";--> statement-breakpoint
ALTER TABLE "app_user" RENAME TO "app_users";--> statement-breakpoint
ALTER TABLE "app_users" DROP CONSTRAINT "app_user_email_unique";--> statement-breakpoint
ALTER TABLE "app_users" DROP CONSTRAINT "app_user_role_id_app_role_id_fk";
--> statement-breakpoint
ALTER TABLE "snacks" ALTER COLUMN "expiry_date" SET DEFAULT '2024-07-23 08:25:39.544';--> statement-breakpoint
ALTER TABLE "app_users" ALTER COLUMN "address" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "app_users" ALTER COLUMN "fullname" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "app_users" ALTER COLUMN "password" SET NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "app_role_permissions" ADD CONSTRAINT "app_role_permissions_role_id_app_roles_id_fk" FOREIGN KEY ("role_id") REFERENCES "public"."app_roles"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "app_role_permissions" ADD CONSTRAINT "app_role_permissions_permission_id_app_permissions_id_fk" FOREIGN KEY ("permission_id") REFERENCES "public"."app_permissions"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "app_users" ADD CONSTRAINT "app_users_role_id_app_roles_id_fk" FOREIGN KEY ("role_id") REFERENCES "public"."app_roles"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "app_roles" DROP COLUMN IF EXISTS "permissions";--> statement-breakpoint
ALTER TABLE "app_users" ADD CONSTRAINT "app_users_email_unique" UNIQUE("email");