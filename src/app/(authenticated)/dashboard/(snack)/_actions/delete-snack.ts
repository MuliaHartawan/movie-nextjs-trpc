"use server";
import { db } from "@/libs/drizzle/connection";
import { snacks } from "@/libs/drizzle/schema";
import { eq } from "drizzle-orm";

// Param from is id of snack
export const deleteSnackAction = async (from: string) => {
  await db.delete(snacks).where(eq(snacks.id, from));

  return {
    success: {
      message: "Snack berhasil dihapus",
    },
  };
};
