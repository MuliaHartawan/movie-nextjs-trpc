import { relations } from "drizzle-orm";
import { timestamp, pgTable, text, uuid, integer, varchar } from "drizzle-orm/pg-core";

// TODO: Set Default not null

export const defaultImage =
  "https://w7.pngwing.com/pngs/205/731/png-transparent-default-avatar-thumbnail.png";

export const users = pgTable("app_users", {
  id: uuid("id").defaultRandom().primaryKey(),
  otp: varchar("otp"),
  email: varchar("email").notNull().unique(),
  image: text("image").default(defaultImage),
  roleId: uuid("role_id").references(() => roles.id, { onDelete: "cascade" }),
  address: text("address").notNull(),
  fullname: varchar("fullname").notNull(),
  password: varchar("password").notNull(),
  emailVerifiedAt: timestamp("email_verified_at", { mode: "date" }),
  createdAt: timestamp("created_at", { mode: "date" }).defaultNow(),
  updatedAt: timestamp("updated_at", { mode: "date" }).defaultNow(),
});

export const roles = pgTable("app_roles", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: varchar("name").notNull(),
  // permissions: text("permissions").notNull().array(),
  createdAt: timestamp("created_at", { mode: "date" }).defaultNow(),
  updatedAt: timestamp("updated_At", { mode: "date" }).defaultNow(),
});

export const permissions = pgTable("app_permissions", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: varchar("name").notNull(),
  createdAt: timestamp("created_at", { mode: "date" }).defaultNow(),
  updatedAt: timestamp("updated_at", { mode: "date" }).defaultNow(),
});

export const rolePermissions = pgTable("app_role_permissions", {
  roleId: uuid("role_id").references(() => roles.id, { onDelete: "cascade" }),
  permissionId: uuid("permission_id").references(() => permissions.id, { onDelete: "cascade" }),
});

export const rolesToPermissionsRelations = relations(roles, ({ many }) => ({
  permissions: many(permissions),
}));

export const permissionsToRolesRelations = relations(permissions, ({ many }) => ({
  roles: many(roles),
}));

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
