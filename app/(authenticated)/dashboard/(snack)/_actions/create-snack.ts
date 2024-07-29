"use server";
import { db } from "@/libs/drizzle/connection";
import { snacks } from "@/libs/drizzle/schema";
import { TCreateOrUpdateSnackForm } from "../_entities/schema";

export const createSnackAction = async (value: TCreateOrUpdateSnackForm, from?: string | null) => {
  try {
    await db.insert(snacks).values({
      ...value,
      expiryDate: new Date(value.expiryDate),
    });

    return {
      success: {
        message: "Snack berhasil ditambahkan",
      },
    };
  } catch (error) {
    return {
      error: {
        message: "Terjadi kesalahan",
      },
    };
  }
};
