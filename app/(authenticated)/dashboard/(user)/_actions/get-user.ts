"use server";
import { db } from "@/libs/drizzle/connection";
import { users } from "@/libs/drizzle/schema";
import { eq } from "drizzle-orm";

// Param from is id of user
export const getUserAction = async (from: string) => {
  try {
    const user = (await db.select().from(users).where(eq(users.id, from))).at(0);
    if (!user) {
      throw "User tidak ditemukan";
    }

    return {
      success: {
        data: user,
      },
    };
  } catch (error) {
    return {
      error: {
        message: error as string,
      },
    };
  }
};
