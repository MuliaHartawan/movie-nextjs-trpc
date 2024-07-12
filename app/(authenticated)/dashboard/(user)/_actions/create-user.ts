"use server";
import { hashPassword } from "@/libs/auth/password";
import { db } from "@/libs/drizzle/connection";
import { roles, users } from "@/libs/drizzle/schema";
import { eq } from "drizzle-orm";
import { TCreateOrUpdateUserForm } from "../_entities/schema";

export const createUserAction = async (value: TCreateOrUpdateUserForm) => {
    try {
        // Check if role is exist
        const role = (await db.select().from(roles).where(eq(roles.id, value.roleId))).at(0);

        if (!role) {
            return {
                error: {
                    message: "Role tidak ditemukan",
                },
            };
        }

        // Check if email is exist
        const email = (await db.select().from(users).where(eq(users.email, value.email))).at(0);
        if (email) {
            return {
                error: {
                    message: "Email sudah digunakan",
                },
            };
        }

        // Hash password
        const password = await hashPassword(value.password);

        await db.insert(users).values({
            ...value,
            password,
        });

        return {
            success: {
                message: "User berhasil ditambahkan",
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