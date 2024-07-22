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
    },
    {
      name: ROLE_DUMMY.STAFF,
    },
    {
      name: ROLE_DUMMY.ADMIN_SNACK,
    },
    {
      name: ROLE_DUMMY.ADMIN_USER,
    },
    {
      name: ROLE_DUMMY.ADMIN_ROLE,
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
