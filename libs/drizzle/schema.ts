import { relations } from "drizzle-orm";
import { timestamp, pgTable, text, uuid, integer, varchar } from "drizzle-orm/pg-core";

export const defaultImage =
  "https://w7.pngwing.com/pngs/205/731/png-transparent-default-avatar-thumbnail.png";

export const roles = pgTable("app_role", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: varchar("name").notNull(),
  permissions: text("permissions").notNull().array(),
  createdAt: timestamp("created_at", { mode: "date" }).defaultNow(),
  updatedAt: timestamp("updated_At", { mode: "date" }).defaultNow(),
});

export const users = pgTable("app_user", {
  id: uuid("id").defaultRandom().primaryKey(),
  otp: varchar("otp"),
  email: varchar("email").notNull().unique(),
  image: text("image").default(defaultImage),
  roleId: uuid("role_id").references(() => roles.id, { onDelete: "cascade" }),
  address: text("address"),
  fullname: varchar("fullname"),
  password: varchar("password"),
  emailVerifiedAt: timestamp("email_verified_at", { mode: "date" }),
  createdAt: timestamp("created_at", { mode: "date" }).defaultNow(),
  updatedAt: timestamp("updated_at", { mode: "date" }).defaultNow(),
});

export const rolesToUserRelations = relations(roles, ({ many }) => ({
  users: many(users),
}));

export const usersToRolesRelations = relations(users, ({ one }) => ({
  roles: one(roles, {
    fields: [users.roleId],
    references: [roles.id],
  }),
}));

const now = new Date();
const defaultExpiryDate = new Date(now.setDate(now.getDate() + 1));

export const snacks = pgTable("snacks", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: varchar("name").notNull(),
  cost: integer("cost").notNull().default(0),
  expiryDate: timestamp("expiry_date", { mode: "date" }).default(defaultExpiryDate),
  createdAt: timestamp("created_at", { mode: "date" }).defaultNow(),
  updatedAt: timestamp("updated_at", { mode: "date" }).defaultNow(),
});
