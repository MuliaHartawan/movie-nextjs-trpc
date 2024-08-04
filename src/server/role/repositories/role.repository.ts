import { db } from "@/libs/drizzle/connection";
import { rolePermissions, roles } from "@/libs/drizzle/schema";
import { Role } from "@/libs/drizzle/schemas/role.schema";
import { TMetaItem } from "@/types/meta";
import { asc, eq, sql } from "drizzle-orm";

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

export const findRolesWithSearch = async (search: string): Promise<Role[]> => {
  const results = db.select().from(roles);

  if (search) {
    results.where(sql`lower(${roles.name}) like lower('%' || ${search} || '%')`);
  }

  return await results;
};

export const findOneRoleById = async (id: string): Promise<Role | undefined> => {
  return await db
    .select()
    .from(roles)
    .where(eq(roles.id, id))
    .limit(1)
    .then((res) => res[0]);
};

export const findOneRoleWithPermissionsById = async (id: string): Promise<Role | undefined> => {
  return await db.query.roles.findFirst({
    where: eq(roles.id, id),
    with: {
      rolePermissions: {
        columns: {
          roleId: false,
          permissionId: false,
        },
        with: {
          permission: {
            columns: {
              id: true,
              name: true,
            },
          },
        },
      },
    },
  });
};

export const createRoleAndPermissions = async (
  name: string,
  permissionIds: string[],
): Promise<void> => {
  await db.transaction(async (trx) => {
    const newRole = (
      await trx
        .insert(roles)
        .values({
          name: name,
        })
        .returning()
    ).at(0);

    const newRolePermissions = permissionIds.map((permissionId) => ({
      roleId: newRole?.id,
      permissionId,
    }));

    await trx.insert(rolePermissions).values(newRolePermissions);
  });
};

export const updateRoleAndPermissionsById = async (
  id: string,
  name: string,
  permissionIds: string[],
): Promise<void> => {
  await db.transaction(async (trx) => {
    const role = await trx.query.roles.findFirst({
      where: eq(roles.id, id),
    });

    if (!role) {
      throw "Role tidak ditemukan";
    }

    role.name = name;

    const newRolePermissions = permissionIds.map((permissionId) => ({
      roleId: role.id,
      permissionId,
    }));

    await trx.update(roles).set(role).where(eq(roles.id, id));
    await trx.delete(rolePermissions).where(eq(rolePermissions.roleId, id));
    await trx.insert(rolePermissions).values(newRolePermissions);
  });
};

export const deleteRoleById = async (id: string): Promise<void> => {
  await db.transaction(async (trx) => {
    await trx.delete(roles).where(eq(roles.id, id));
    await trx.delete(rolePermissions).where(eq(rolePermissions.roleId, id));
  });
};
