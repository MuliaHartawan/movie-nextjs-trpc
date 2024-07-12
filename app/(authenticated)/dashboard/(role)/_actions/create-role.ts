"use server";
import { TCreateOrUpdateRoleForm } from "../_entities/schema";
import { db } from "@/libs/drizzle/connection";
import { roles } from "@/libs/drizzle/schema";

export const createRoleAction = async (value: TCreateOrUpdateRoleForm) => {
    try {
        await db.insert(roles).values({
            ...value,
        });

        return {
            success: {
                message: "Role berhasil ditambahkan",
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