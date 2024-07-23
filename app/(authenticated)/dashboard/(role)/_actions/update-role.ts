"use server";
import { TCreateOrUpdateRoleForm } from "../_entities/schema";
import { db } from "@/libs/drizzle/connection";
import { rolePermissions, roles } from "@/libs/drizzle/schema";
import { eq } from "drizzle-orm";

// Param from is id of role
export const updateRoleAction = async ({
  value,
  id,
}: {
  value: TCreateOrUpdateRoleForm;
  id: string;
}) => {
  try {
    // Find role by id
    const role = await db.query.roles.findFirst({
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

    if (!role) {
      throw "Role tidak ditemukan";
    }

    // Update role name
    role.name = value.name;

    // map role permission
    const newRolePermissions = value.permissionIds.map((permissionId) => ({
      roleId: role.id,
      permissionId,
    }));

    // Update role and role permission using transaction
    await db.transaction(async (trx) => {
      await trx.update(roles).set(role).where(eq(roles.id, id));
      await trx.delete(rolePermissions).where(eq(rolePermissions.roleId, id));
      await trx.insert(rolePermissions).values(newRolePermissions);
    });

    return {
      success: {
        message: "Role berhasil diubah",
      },
    };
  } catch (error) {
    return {
      error: {
        message: error as string,
      },
    };
  }
};
