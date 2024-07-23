import { z } from "zod";

export const createOrUpdateRoleSchema = z.object({
  name: z
    .string({ required_error: "Nama Wajib Diisi", message: "Nama harus berupa string" })
    .min(1, { message: "Nama wajib diisi" })
    .max(255, { message: "Nama maksimal 255 karakter" }),
  permissionIds: z
    .array(z.string({ message: "Permission id harus berupa string" }))
    .nonempty({ message: "Minimal satu permission harus dipilih" }),
});

export type TCreateOrUpdateRoleForm = z.infer<typeof createOrUpdateRoleSchema>;
