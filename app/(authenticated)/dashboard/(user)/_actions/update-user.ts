"use server";

import { hashPassword } from "@/libs/auth/password";
import { db } from "@/libs/drizzle/connection";
import { users, roles } from "@/libs/drizzle/schema";
import { eq } from "drizzle-orm";
import { TCreateOrUpdateUserForm } from "../_entities/schema";

// Param from is id of user
export const updateUserAction = async (value: TCreateOrUpdateUserForm, from: string) => {
    try {
        const user = (await db.select().from(users).where(eq(users.id, from))).at(0);
        if (!user) {
            throw "User tidak ditemukan";
        }

        // Check if role is exist
        const role = (await db.select().from(roles).where(eq(roles.id, value.roleId))).at(0);
        if (!role) {
            return {
                error: {
                    message: "Role tidak ditemukan",
                },
            };
        }

        // Check if email is exist and not same with current user
        const email = (await db.select().from(users).where(eq(users.email, value.email))).at(0);
        if (email && email.id !== from) {
            return {
                error: {
                    message: "Email sudah digunakan",
                },
            };
        }

        user.fullname = value.fullname;
        user.address = value.address;
        user.password = await hashPassword(value.password);
        user.email = value.email;
        user.roleId = value.roleId;

        await db.update(users).set(user).where(eq(users.id, from));

        return {
            success: {
                message: "User berhasil diubah",
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
