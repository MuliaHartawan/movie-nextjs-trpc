import { db } from "@/libs/drizzle/connection";
import { rolePermissions, roles } from "@/libs/drizzle/schema";
import { Role } from "@/libs/drizzle/schemas/role.schema";
import { TMetaItem } from "@/types/meta";
import { asc, eq, sql } from "drizzle-orm";
import { TCreateOrUpdateRoleForm } from "../entities/validation";

export const rolePagination = async (
  meta: TMetaItem,
): Promise<{ roles: Role[]; count: number }> => {
  const page = meta?.page || 1;
  const perPage = meta?.perPage || 8;
  const offset = (page - 1) * perPage;
  const search = meta?.search;
  const query = db.select().from(roles);

  if (search) {
    query.where(sql`lower(${roles.name}) like lower('%' || ${search} || '%')`);
  }

  const data = await query
    .limit(perPage)
    .offset(offset)
    .orderBy(roles.createdAt, asc(roles.createdAt));

  const count = await db
    .select({ id: roles.id })
    .from(roles)
    .then((res) => res.length);

  return {
    roles: data,
    count: count,
  };
};

export const findOneRoleById = async (id: string): Promise<Role | undefined> => {
  return await db
    .select()
    .from(roles)
    .where(eq(roles.id, id))
    .limit(1)
    .then((res) => res[0]);
};

export const createRole = async (value: TCreateOrUpdateRoleForm): Promise<void> => {
  const role = (
    await db
      .insert(roles)
      .values({
        name: value.name,
      })
      .returning()
  ).at(0);

  const newRolePermissions = value.permissionIds.map((permissionId) => ({
    roleId: role?.id,
    permissionId,
  }));

  await db.insert(rolePermissions).values(newRolePermissions);
};
