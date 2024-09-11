import CredentialsProvider from "next-auth/providers/credentials";
import { findUserByEmailWithRole, isEmailRegistered, isValidPassword } from "./login";
import type { NextAuthConfig } from "next-auth";
import { schema } from "@/app/(public)/auth/(login)/_entities/schema";
import UnauthorizedException from "../../errors/UnauthorizedException";
import BadRequestException from "../../errors/BadRequestException";

export const authConfig = {
  providers: [
    CredentialsProvider({
      id: "login",
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "Masukkan email" },
        password: { label: "Password", type: "password", placeholder: "*********" },
      },
      async authorize(credentials) {
        const { data } = schema.safeParse(credentials);

        if (!data?.email || !data?.password) {
          throw new BadRequestException("Email dan Password wajib diisi");
        }

        const isUserExist = await isEmailRegistered(data?.email);

        if (!isUserExist) {
          throw new UnauthorizedException("Email belum terdaftar");
        }

        const isPasswordCorrect = await isValidPassword(data?.email, data?.password);

        console.log("isPasswordCorrect", isPasswordCorrect);

        if (!isPasswordCorrect) {
          throw new UnauthorizedException("Email atau Kata sandi tidak valid");
        }

        const userData = await findUserByEmailWithRole(data?.email);

        if (userData) {
          return {
            ...userData,
            role: {
              id: userData?.role?.id as string,
              name: userData?.role?.name as string,
              permissions: userData?.role?.rolePermissions?.map(
                (rolePermission) => rolePermission.permission.name,
              ) as string[],
            },
          };
        } else {
          return null;
        }
      },
    }),
  ],
} satisfies NextAuthConfig;
