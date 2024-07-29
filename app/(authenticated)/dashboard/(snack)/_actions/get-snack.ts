"use server";
import { db } from "@/libs/drizzle/connection";
import { snacks } from "@/libs/drizzle/schema";
import { eq } from "drizzle-orm";
import { Snack } from "./get-snacks";

// Param from is id of snack
export const getSnackAction = async (from: string) => {
  try {
    const snack = (await db.select().from(snacks).where(eq(snacks.id, from))).at(0);
    if (!snack) {
      throw "Snack tidak ditemukan";
    }

    return {
      success: {
        data: snack as Snack,
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
