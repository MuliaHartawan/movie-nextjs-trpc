import exp from "constants";
import { timestamp, pgTable, text, uuid } from "drizzle-orm/pg-core";

const defaultImage =
  "https://w7.pngwing.com/pngs/205/731/png-transparent-default-avatar-thumbnail.png";

export const users = pgTable("app_user", {
  id: uuid("id").defaultRandom().primaryKey(),
  otp: text("otp"),
  fullname: text("fullname"),
  address: text("address"),
  password: text("password"),
  email: text("email").notNull().unique(),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
  image: text("image").default(defaultImage),
  createdAt: timestamp("createdAt", { mode: "date" }).defaultNow(),
  updatedAt: timestamp("updatedAt", { mode: "date" }).defaultNow(),
});


const now = new Date();
// Default expiry date is 1 day from now
const defaultExpiryDate = new Date(now.setDate(now.getDate() + 1));

export const snacks = pgTable("snacks", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  price: text("price").notNull(),
  expiryDate: timestamp("expiryDate", { mode: "date" }).default(defaultExpiryDate),
  createdAt: timestamp("createdAt", { mode: "date" }).defaultNow(),
  updatedAt: timestamp("updatedAt", { mode: "date" }).defaultNow(),
});
