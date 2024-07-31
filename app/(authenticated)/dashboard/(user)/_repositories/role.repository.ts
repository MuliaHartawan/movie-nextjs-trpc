import { db } from "@/libs/drizzle/connection";
import { roles } from "@/libs/drizzle/schema";
import { Role } from "@/libs/drizzle/schemas/role.schema";
import Ribbon from "antd/es/badge/Ribbon";
import { eq } from "drizzle-orm";

export const findOneRoleById = async (id: string): Promise<Role | undefined> => {
  return await db
    .select()
    .from(roles)
    .where(eq(roles.id, id))
    .limit(1)
    .then((res) => res[0]);
};
