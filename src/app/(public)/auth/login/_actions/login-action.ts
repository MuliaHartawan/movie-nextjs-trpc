"use server";

import { signIn } from "@/libs/auth/auth";
import { TLoginForm } from "../_entities/schema";

export const loginByCredentials = async (payload: TLoginForm) => {
  return signIn("login", {
    redirect: false,
    email: payload.email,
    password: payload.password,
  });
};

export const loginByGoogle = async () => {
  return signIn("google", {
    redirect: true,
  });
};
