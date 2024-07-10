import * as uuid from "uuid";
import { User } from "@/app/(authenticated)/dashboard/(list-user)/actions/get-users";
import { hashPassword } from "../../auth/password";
import { defaultImage, users } from "../schema";
import { PostgresJsDatabase } from "drizzle-orm/postgres-js";

const { v4: uuidv4 } = uuid;

export const seedUsers = async (db: PostgresJsDatabase<Record<string, never>>) => {
    console.log("Seeding users...");
    const dummyUsers: User[] = [];
    for (let i = 0; i < 10; i++) {
        const dummyUser: User = {
            id: uuidv4(),
            otp: null,
            fullname: `John Doe ${i+1}`,
            email: `johndoe@${i+1}email.com`,
            address: `Address ${i+1}`,
            password: await hashPassword(`password${i+1}`),
            image: defaultImage,
            emailVerified: new Date(),
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        dummyUsers.push(dummyUser);
    }

    try {
        await db.insert(users).values(dummyUsers).execute();
        console.log("Seeding users done!");
    } catch (error) {
        console.log("Seeding users failed!", error);
    }
}