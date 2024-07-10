CREATE TABLE IF NOT EXISTS "snacks" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"price" text NOT NULL,
	"expiryDate" timestamp DEFAULT '2024-07-11 03:15:23.661',
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp DEFAULT now()
);
