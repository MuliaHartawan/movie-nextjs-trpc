"use server";
import { TCreateOrUpdateRoleForm } from "../_entities/schema";
import { db } from "@/libs/drizzle/connection";
import { roles } from "@/libs/drizzle/schema";
import { eq } from "drizzle-orm";

// Param from is id of role
export const updateRoleAction = async (value: TCreateOrUpdateRoleForm, from: string) => {
    try {
        const role = (await db.select().from(roles).where(eq(roles.id, from))).at(0);
        if (!role) {
            throw "Role tidak ditemukan";
        }

        role.name = value.name;
        role.permissions = value.permissions;

        await db.update(roles).set(role).where(eq(roles.id, from));

        return {
            success: {
                message: "Role berhasil diubah",
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