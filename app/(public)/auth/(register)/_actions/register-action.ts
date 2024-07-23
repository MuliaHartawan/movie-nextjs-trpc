"use server";
import { db } from "@/libs/drizzle/connection";
import { roles, users } from "@/libs/drizzle/schema";
import { TRegisterForm } from "../_entities/schema";
import { sendOtpVerficationEmail } from "@/libs/resend/send-otp";
import { generateOtp } from "@/libs/auth/otp";
import { hashPassword } from "@/libs/auth/password";
import { eq } from "drizzle-orm";
import { ROLE_DUMMY } from "@/common/enums/role-dummy.enum";

export const registerAction = async (value: TRegisterForm, from?: string | null) => {
  const password = await hashPassword(value.password);
  const roleId = await db
    .select({ id: roles.id })
    .from(roles)
    .where(eq(roles.name, ROLE_DUMMY.STAFF))
    .then((data) => data.at(0)?.id);
  const { otp, otpHash } = await generateOtp();
  try {
    if (!from) {
      await db.insert(users).values({
        ...value,
        otp: otpHash,
        roleId,
        password,
      });
      await sendOtpVerficationEmail({ email: value.email, otp });
      return {
        success: {
          code: 200,
          message: "Pendaftaran berhasil, silahkan cek email anda",
        },
      };
    }

    if (from === "google") {
      await db
        .update(users)
        .set({
          ...value,
          otp: otpHash,
          password,
        })
        .where(eq(users.email, value.email));
      await sendOtpVerficationEmail({ email: value.email, otp });
      return {
        success: {
          message: "Pendaftaran berhasil, silahkan cek email anda",
        },
      };
    }
  } catch (error) {
    const err = error as { code: string };
    if (err?.code === "23505") {
      return {
        error: {
          code: 400,
          message: "Email sudah digunakan",
        },
      };
    } else {
      return {
        error: {
          code: 500,
          message: "Terjadi kesalahan",
        },
      };
    }
  }
};
