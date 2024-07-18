"use server";
import { db } from "@/libs/drizzle/connection";
import { roles } from "@/libs/drizzle/schema";
import { eq } from "drizzle-orm";

export const getRoleAction = async (from: string) => {
    try {
        const role = (await db.select().from(roles).where(eq(roles.id, from))).at(0);
        if (!role) {
            throw "Role tidak ditemukan";
        }

        return {
            success: {
                data: role,
            },
        };
    } catch (error) {
        return {
            error: {
                message: error as string,
            },
        };
    }
}