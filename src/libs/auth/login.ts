"use server";
import "server-only";
import { eq } from "drizzle-orm";
import { db } from "../drizzle/connection";
import { roles, users } from "../drizzle/schema";
import { verifyPassword } from "./password";
import { signOut } from "./auth";
import prisma from "../prisma/prisma";

export const isEmailRegistered = async (email: string) => {
  return await prisma.user
    .count({
      where: {
        email,
      },
    })
    .then((count) => count > 0);
};

export const isValidPassword = async (email: string, password: string) => {
  const user = await prisma.user.findFirst({
    where: {
      email,
    },
  });

  if (user) {
    return await verifyPassword(password, user.password);
  }
};

export const findUserByEmailWithRole = async (email: string) => {
  return prisma.user.findFirst({
    where: {
      email: email,
    },
    include: {
      role: {
        include: {
          rolePermissions: {
            include: {
              permission: true,
            },
          },
        },
      },
    },
  });
};

export const getRoleData = async (roleId?: string | null) => {
  if (!roleId) return;
  try {
    const res = await db
      .select()
      .from(roles)
      .where(eq(roles.id, roleId))
      .then((res) => res.at(0));
    return res;
  } catch (err) {
    throw err;
  }
};

export const logOut = async () => {
  try {
    return await signOut({
      redirect: true,
      redirectTo: "/auth/login",
    });
  } catch (err) {
    throw err;
  }
};
