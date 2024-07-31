import { NodePgDatabase } from "drizzle-orm/node-postgres";
import { Role } from "../schemas/role.schema";
import { roles } from "../schema";
import { ROLE_DUMMY } from "@/common/enums/role-dummy.enum";
import * as schema from "../schema";

export const seedRoles = async (db: NodePgDatabase<typeof schema>) => {
  console.log("Seeding roles...");
  const dummyRoles: Role[] = [
    {
      name: ROLE_DUMMY.ADMIN,
      rolePermissions: [],
    },
    {
      name: ROLE_DUMMY.STAFF,
      rolePermissions: [],
    },
    {
      name: ROLE_DUMMY.ADMIN_SNACK,
      rolePermissions: [],
    },
    {
      name: ROLE_DUMMY.ADMIN_USER,
      rolePermissions: [],
    },
    {
      name: ROLE_DUMMY.ADMIN_ROLE,
      rolePermissions: [],
    },
  ];

  await db
    .insert(roles)
    .values(dummyRoles)
    .execute()
    .catch((error) => {
      console.log("Seed roles failed!", error);
    });
};
