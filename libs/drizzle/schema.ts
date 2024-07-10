import { timestamp, pgTable, text, uuid } from "drizzle-orm/pg-core";

export const defaultImage =
  "https://w7.pngwing.com/pngs/205/731/png-transparent-default-avatar-thumbnail.png";

export const roles = pgTable("app_role", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  permissions: text("permissions").notNull().array(),
  createdAt: timestamp("createdAt", { mode: "date" }).defaultNow(),
  updatedAt: timestamp("updatedAt", { mode: "date" }).defaultNow(),
});

export const users = pgTable("app_user", {
  id: uuid("id").defaultRandom().primaryKey(),
  otp: text("otp"),
  email: text("email").notNull().unique(),
  image: text("image").default(defaultImage),
  roleId: uuid("roleId").references(() => roles.id, { onDelete: "cascade" }),
  address: text("address"),
  fullname: text("fullname"),
  password: text("password"),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
  createdAt: timestamp("createdAt", { mode: "date" }).defaultNow(),
  updatedAt: timestamp("updatedAt", { mode: "date" }).defaultNow(),
});

const now = new Date();
const defaultExpiryDate = new Date(now.setDate(now.getDate() + 1));

export const snacks = pgTable("snacks", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  price: text("price").notNull(),
  expiryDate: timestamp("expiryDate", { mode: "date" }).default(defaultExpiryDate),
  createdAt: timestamp("createdAt", { mode: "date" }).defaultNow(),
  updatedAt: timestamp("updatedAt", { mode: "date" }).defaultNow(),
});
