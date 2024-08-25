import { z } from "zod";

export const createOrUpdateUserSchema = z.object({
  fullname: z
    .string({ required_error: "Nama Wajib Diisi", message: "Nama harus berupa string" })
    .min(1, { message: "Nama wajib diisi" })
    .max(255, { message: "Nama maksimal 255 karakter" }),
  address: z
    .string({ required_error: "Alamat Wajib Diisi", message: "Alamat harus berupa string" })
    .min(1, { message: "Alamat wajib diisi" }),
  password: z
    .string({ required_error: "Password Wajib Diisi", message: "Password harus berupa string" })
    .min(8, { message: "Password minimal 8 karakter" }),
  email: z
    .string({ required_error: "Email Wajib Diisi", message: "Email harus berupa string" })
    .email({ message: "Email tidak valid" }),
  roleId: z
    .string({ required_error: "Role Wajib Diisi", message: "Role harus berupa string" })
    .uuid({ message: "Role tidak valid" }),
});

export type TCreateOrUpdateUserValidation = z.infer<typeof createOrUpdateUserSchema>;
