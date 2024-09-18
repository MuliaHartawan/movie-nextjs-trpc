import { PERMISSIONS } from "@/common/enums/permissions.enum";
import { ROLE_DUMMY } from "@/common/enums/role-dummy.enum";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function rolePermissionSeeder() {
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

  const newRolePermissions = [];

  for (const roleRolePermission of dummyRolePermissions) {
    const role = await prisma.role.findFirstOrThrow({
      where: {
        name: roleRolePermission.role,
      },
    });

    for (const permission of roleRolePermission.permissions) {
      const permissionData = await prisma.permission.findFirstOrThrow({
        where: {
          name: permission,
        },
      });

      newRolePermissions.push({
        roleId: role.id,
        permissionId: permissionData.id,
      });
    }
  }

  // Create role permissions
  await prisma.rolePermission.createMany({
    data: newRolePermissions,
  });

  console.log("Role permissions seeded");
}
