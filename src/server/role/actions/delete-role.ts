"use server";
import { db } from "@/libs/drizzle/connection";
import { roles } from "@/libs/drizzle/schema";
import { eq } from "drizzle-orm";

// Param from is id of role
export const deleteRoleAction = async (from: string) => {
  try {
    await db.delete(roles).where(eq(roles.id, from));

    return {
      success: {
        message: "Role berhasil dihapus",
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
