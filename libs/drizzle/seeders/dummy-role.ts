import { PostgresJsDatabase } from "drizzle-orm/postgres-js";

import { Role } from "../schemas/role.schema";
import { PERMISSIONS } from "@/common/enums/permissions.enum";
import { roles } from "../schema";
import { ROLE_DUMMY } from "@/common/enums/role-dummy.enum";

export const seedRoles = async (db: PostgresJsDatabase<Record<string, never>>) => {
    console.log("Seeding roles...");
    const dummyRoles: Role[] = [
        {
            name: ROLE_DUMMY.ADMIN,
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
            name: ROLE_DUMMY.STAFF,
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
            name: ROLE_DUMMY.ADMIN_SNACK,
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
            name: ROLE_DUMMY.ADMIN_USER,
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
            name: ROLE_DUMMY.ADMIN_ROLE,
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

    try {
        await db.insert(roles).values(dummyRoles).execute();
        console.log("Seeding roles done!");
    } catch (error) {
        console.log("Seeding roles failed!", error);
    }
}