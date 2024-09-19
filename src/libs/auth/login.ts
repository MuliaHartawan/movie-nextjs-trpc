"use server";
import "server-only";
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
  const user = await prisma.user.findFirstOrThrow({
    where: {
      email,
    },
  });

  return await verifyPassword(password, user.password);
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
