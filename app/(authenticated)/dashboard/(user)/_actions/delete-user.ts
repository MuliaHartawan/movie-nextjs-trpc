"use server";
import { db } from "@/libs/drizzle/connection";
import { users } from "@/libs/drizzle/schema";
import { eq } from "drizzle-orm";

// Param from is id of user
export const deleteUserAction = async (from: string) => {
    try {
        await db.delete(users).where(eq(users.id, from));

        return {
            success: {
                message: "User berhasil dihapus",
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