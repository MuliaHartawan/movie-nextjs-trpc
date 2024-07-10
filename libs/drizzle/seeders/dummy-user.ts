import { hashPassword } from "../../auth/password";
import { defaultImage, roles, users } from "../schema";
import { PostgresJsDatabase } from "drizzle-orm/postgres-js";
import { ROLE_DUMMY } from "@/common/enums/role-dummy.enum";
import { User } from "../schemas/user.schema";

export const seedUsers = async (db: PostgresJsDatabase<Record<string, never>>) => {
    console.log("Seeding users...");
    const dummyUsers: User[] = [];
    
    const existingRoles = await db.select().from(roles);

    // Create 1000 dummy users
    for (let i = 0; i < 1000; i++) {
        const dummyUser: User = {
            otp: null,
            fullname: `John Doe ${i+1}`,
            email: `johndoe@${i+1}email.com`,
            address: `Address ${i+1}`,
            password: await hashPassword(`password${i+1}`),
            image: defaultImage,
            emailVerified: new Date(),
        };

        // Define the user's role with conditions
        if (i < 200) { // 0 - 199
            dummyUser.roleId = existingRoles.find(role => role.name === ROLE_DUMMY.ADMIN)?.id;
        } else if (i >= 200 && i < 400) { // 200 - 399
            dummyUser.roleId = existingRoles.find(role => role.name === ROLE_DUMMY.STAFF)?.id;
        } else if (i >= 400 && i < 600) { // 400 - 599
            dummyUser.roleId = existingRoles.find(role => role.name === ROLE_DUMMY.ADMIN_SNACK)?.id;
        } else if (i >= 600 && i < 800) { // 600 - 799
            dummyUser.roleId = existingRoles.find(role => role.name === ROLE_DUMMY.ADMIN_USER)?.id;
        } else { // 800 - 999
            dummyUser.roleId = existingRoles.find(role => role.name === ROLE_DUMMY.ADMIN_ROLE)?.id;
        }

        dummyUsers.push(dummyUser);
    }

    try {
        await db.insert(users).values(dummyUsers).execute();
        console.log("Seeding users done!");
    } catch (error) {
        console.log("Seeding users failed!", error);
    }
}