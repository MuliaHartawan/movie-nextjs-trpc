"use server"

import { db } from "@/libs/drizzle/connection";
import { roles } from "@/libs/drizzle/schema";
import { TCreateOrUpdateRoleForm } from "../entities/schema";
import { eq } from "drizzle-orm/sql";

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
}

export const getRoleAction = async (from: string) => {
    try {
        const role = (await db.select().from(roles).where(eq(roles.id, from))).at(0);
        if (!role) {
            throw "Role tidak ditemukan";
        }

        return {
            success: {
                data: role,
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