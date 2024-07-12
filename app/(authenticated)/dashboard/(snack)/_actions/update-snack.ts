"use server";
import { db } from "@/libs/drizzle/connection";
import { snacks } from "@/libs/drizzle/schema";
import { eq } from "drizzle-orm";
import { TCreateOrUpdateSnackForm } from "../_entities/schema";

// Param from is id of snack
export const updateSnackAction = async (value: TCreateOrUpdateSnackForm, from: string) => {
    try {
        const snack = (await db.select().from(snacks).where(eq(snacks.id, from))).at(0);
        if (!snack) {
            throw "Snack tidak ditemukan";
        }

        snack.expiryDate = new Date(value.expiryDate);
        snack.name = value.name;
        snack.cost = value.cost;

        await db.update(snacks).set(snack).where(eq(snacks.id, from));

        return {
            success: {
                message: "Snack berhasil diubah",
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
