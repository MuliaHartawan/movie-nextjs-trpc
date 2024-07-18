"use server";
import { db } from "@/libs/drizzle/connection";
import { snacks } from "@/libs/drizzle/schema";
import { eq } from "drizzle-orm";
import { TCreateOrUpdateSnackForm } from "../_entities/schema";
import dayjs from "dayjs";

// Param from is id of snack
export const updateSnackAction = async ({ value, id }: { value: TCreateOrUpdateSnackForm, id: string }) => {
    try {
        const snack = (await db.select().from(snacks).where(eq(snacks.id, id))).at(0);
        if (!snack) {
            throw "Snack tidak ditemukan";
        }

        snack.name = value.name;
        snack.cost = value.cost;
        snack.expiryDate = new Date(value.expiryDate);

        await db.update(snacks).set(snack).where(eq(snacks.id, id));

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
