import { PERMISSIONS } from "@/common/enums/permissions.enum";
import { permissions, rolePermissions, roles } from "../schema";
import { ROLE_DUMMY } from "@/common/enums/role-dummy.enum";
import { eq } from "drizzle-orm";
import { NodePgDatabase } from "drizzle-orm/node-postgres";
import * as schema from "../schema";

export const seedRolePermissions = async (db: NodePgDatabase<typeof schema>) => {
  console.log("Seeding role permissions...");
  const dummyRolePermissions = [
    {
      role: ROLE_DUMMY.ADMIN,
      permissions: [
        PERMISSIONS.DASHBOARD,
        PERMISSIONS.SNACK_CREATE,
        PERMISSIONS.SNACK_READ,
        PERMISSIONS.SNACK_UPDATE,
        PERMISSIONS.SNACK_DELETE,
        PERMISSIONS.SNACK_DETAIL,
        PERMISSIONS.USER_CREATE,
        PERMISSIONS.USER_READ,
        PERMISSIONS.USER_UPDATE,
        PERMISSIONS.USER_DELETE,
        PERMISSIONS.USER_DETAIL,
        PERMISSIONS.ROLE_CREATE,
        PERMISSIONS.ROLE_UPDATE,
        PERMISSIONS.ROLE_DELETE,
        PERMISSIONS.ROLE_DETAIL,
        PERMISSIONS.ROLE_READ,
      ],
    },
    {
      role: ROLE_DUMMY.STAFF,
      permissions: [
        PERMISSIONS.DASHBOARD,
        PERMISSIONS.SNACK_READ,
        PERMISSIONS.SNACK_DETAIL,
        PERMISSIONS.USER_READ,
        PERMISSIONS.USER_DETAIL,
        PERMISSIONS.ROLE_READ,
        PERMISSIONS.ROLE_DETAIL,
      ],
    },
    {
      role: ROLE_DUMMY.ADMIN_SNACK,
      permissions: [
        PERMISSIONS.DASHBOARD,
        PERMISSIONS.SNACK_READ,
        PERMISSIONS.SNACK_DETAIL,
        PERMISSIONS.SNACK_CREATE,
        PERMISSIONS.SNACK_UPDATE,
        PERMISSIONS.SNACK_DELETE,
      ],
    },
    {
      role: ROLE_DUMMY.ADMIN_USER,
      permissions: [
        PERMISSIONS.DASHBOARD,
        PERMISSIONS.USER_READ,
        PERMISSIONS.USER_DETAIL,
        PERMISSIONS.USER_CREATE,
        PERMISSIONS.USER_UPDATE,
        PERMISSIONS.USER_DELETE,
      ],
    },
    {
      role: ROLE_DUMMY.ADMIN_ROLE,
      permissions: [
        PERMISSIONS.DASHBOARD,
        PERMISSIONS.ROLE_READ,
        PERMISSIONS.ROLE_DETAIL,
        PERMISSIONS.ROLE_CREATE,
        PERMISSIONS.ROLE_UPDATE,
        PERMISSIONS.ROLE_DELETE,
      ],
    },
  ];

  for (const dummyRolePermission of dummyRolePermissions) {
    const role = await db.query.roles.findFirst({
      where: eq(roles.name, dummyRolePermission.role),
    });

    if (!role) {
      throw `Role ${dummyRolePermission.role} not found`;
    }

    for (const permission of dummyRolePermission.permissions) {
      const permissionData = await db.query.permissions.findFirst({
        where: eq(permissions.name, permission),
      });

      if (!permissionData) {
        throw `Permission ${permission} not found`;
      }

      await db
        .insert(rolePermissions)
        .values({
          roleId: role.id,
          permissionId: permissionData.id,
        })
        .execute()
        .catch((error) => {
          console.log("Seeding role permissions failed!", error);
        });
    }
  }
};
