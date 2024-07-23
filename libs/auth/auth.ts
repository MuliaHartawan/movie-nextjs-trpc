import NextAuth from "next-auth";
import { authConfig } from "./config";
import { TUser } from "@/types/user";

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async signIn({ user }) {
      if (!user) return false;
      return true;
    },

    async jwt({ token, user, account }) {
      if (account?.provider === "login") {
        const userData = user as TUser;
        token.user = {
          id: userData.id,
          fullname: userData.fullname,
          image: userData.image,
          email: userData.email,
          emailVerified: userData.emailVerified,
          address: userData.address,
          createdAt: userData.createdAt,
          updatedAt: userData.updatedAt,
        };
      }

      return token;
    },

    async session({ session, token }) {
      session.user = token.user;
      return session;
    },
  },
});
