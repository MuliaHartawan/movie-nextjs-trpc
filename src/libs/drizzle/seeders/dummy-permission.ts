import { PERMISSIONS } from "@/common/enums/permissions.enum";
import { NodePgDatabase } from "drizzle-orm/node-postgres";
import { permissions } from "../schema";
import { Permission } from "../schemas/permission.schema";
import * as schema from "../schema";

export const seedPermissions = async (db: NodePgDatabase<typeof schema>) => {
  console.log("Seeding permissions...");
  const dummyPermissions: Permission[] = [
    {
      name: PERMISSIONS.DASHBOARD,
    },
    {
      name: PERMISSIONS.SNACK_CREATE,
    },
    {
      name: PERMISSIONS.SNACK_READ,
    },
    {
      name: PERMISSIONS.SNACK_UPDATE,
    },
    {
      name: PERMISSIONS.SNACK_DELETE,
    },
    {
      name: PERMISSIONS.SNACK_DETAIL,
    },
    {
      name: PERMISSIONS.USER_CREATE,
    },
    {
      name: PERMISSIONS.USER_READ,
    },
    {
      name: PERMISSIONS.USER_UPDATE,
    },
    {
      name: PERMISSIONS.USER_DELETE,
    },
    {
      name: PERMISSIONS.USER_DETAIL,
    },
    {
      name: PERMISSIONS.ROLE_CREATE,
    },
    {
      name: PERMISSIONS.ROLE_UPDATE,
    },
    {
      name: PERMISSIONS.ROLE_DELETE,
    },
    {
      name: PERMISSIONS.ROLE_DETAIL,
    },
    {
      name: PERMISSIONS.ROLE_READ,
    },
  ];

  await db
    .insert(permissions)
    .values(dummyPermissions)
    .execute()
    .catch((error) => {
      console.log("Seeding permissions failed!", error);
    });
};
