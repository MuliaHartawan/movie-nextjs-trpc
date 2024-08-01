"use server";
import { db } from "@/libs/drizzle/connection";
import { rolePermissions, roles } from "@/libs/drizzle/schema";
import { TCreateOrUpdateRoleForm } from "../entities/validation";

export const createRoleAction = async (value: TCreateOrUpdateRoleForm) => {
  try {
    // Insert role
    const role = (
      await db
        .insert(roles)
        .values({
          name: value.name,
        })
        .returning()
    ).at(0);

    // Map role permission
    const newRolePermissions = value.permissionIds.map((permissionId) => ({
      roleId: role?.id,
      permissionId,
    }));

    // insert role permission
    await db.insert(rolePermissions).values(newRolePermissions);

    return {
      success: {
        message: "Role berhasil ditambahkan",
      },
    };
  } catch (error) {
    return {
      error: {
        message: "Terjadi kesalahan",
      },
    };
  }
};
