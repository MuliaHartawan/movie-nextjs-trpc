import CredentialsProvider from "next-auth/providers/credentials";
import { checkEmail, checkPassword, getRoleData, getUserData } from "./login";
import type { NextAuthConfig } from "next-auth";
import { schema } from "@/app/(public)/auth/(login)/_entities/schema";

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
          throw "Email dan Password wajib diisi";
        }

        const isUserExist = await checkEmail(data?.email);

        if (!isUserExist) {
          throw "Akun tidak terdaftar";
        }

        const isPasswordCorrect = await checkPassword(data?.password, data?.email);

        if (!isPasswordCorrect) {
          throw "Email atau Kata sandi tidak valid";
        }

        const userData = await getUserData(data?.email);

        // const isEmailVerified = userData?.emailVerifiedAt;

        // if (!isEmailVerified) {
        //   throw "Email belum terverifikasi";
        // }

        if (userData) {
          return {
            ...userData,
            role: {
              id: userData?.roles?.id as string,
              name: userData?.roles?.name as string,
              permissions: userData?.roles?.rolePermissions?.map(
                (rolePermission) => rolePermission.permission?.name,
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
