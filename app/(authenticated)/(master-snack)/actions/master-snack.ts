"use server";

import { db } from "@/libs/drizzle/connection";
import { snacks } from "@/libs/drizzle/schema";
import { eq } from "drizzle-orm";
import { TCreateOrUpdateSnackForm } from "../entities/schema";

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
}

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

// Param from is id of snack
export const deleteSnackAction = async (from: string) => {
    try {
        await db.delete(snacks).where(eq(snacks.id, from));

        return {
            success: {
                message: "Snack berhasil dihapus",
            },
        };
    } catch (error) {
        return {
            error: {
                message: "Terjadi kesalahan",
            },
        };
    }
}

// Param from is id of snack
export const getSnackAction = async (from: string) => {
    try {
        const snack = (await db.select().from(snacks).where(eq(snacks.id, from))).at(0);
        if (!snack) {
            throw "Snack tidak ditemukan";
        }

        return {
            success: {
                data: snack,
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