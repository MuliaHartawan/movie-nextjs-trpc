"use server";
import { hashPassword } from "@/libs/auth/password";
import { db } from "@/libs/drizzle/connection";
import { roles, users } from "@/libs/drizzle/schema";
import { eq } from "drizzle-orm";
import { TCreateOrUpdateUserForm } from "../_entities/schema";

export const createUserAction = async (value: TCreateOrUpdateUserForm) => {
  try {
    const role = (await db.select().from(roles).where(eq(roles.id, value.roleId))).at(0);

    if (!role) {
      return {
        status: "error",
        error: "Role tidak ditemukan",
      };
    }

    const email = (await db.select().from(users).where(eq(users.email, value.email))).at(0);
    if (email) {
      return {
        status: "error",
        error: "Email sudah digunakan",
      };
    }

    const password = await hashPassword(value.password);

    await db.insert(users).values({
      ...value,
      password,
    });

    return {
      status: "success",
      message: "User created successfully",
    };
  } catch (error) {
    return {
      status: "error",
      error,
    };
  }
};
