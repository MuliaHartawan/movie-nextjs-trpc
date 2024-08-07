import { z } from "zod";

export const createOrUpdateSnackSchema = z.object({
  name: z
    .string({ required_error: "Nama Wajib Diisi", message: "Nama harus berupa string" })
    .min(1, { message: "Nama wajib diisi" }),
  cost: z
    .number({ required_error: "Biaya Wajib Diisi", message: "Biaya harus berupa andka" })
    .min(1, { message: "Biaya wajib diisi" }),
  expiryDate: z
    .string({ required_error: "Tanggal kadaluarsa wajib diisi" })
    .date("Tanggal kadaluarsa harus berupa tanggal"),
});

export type TCreateOrUpdateSnackValidation = z.infer<typeof createOrUpdateSnackSchema>;
