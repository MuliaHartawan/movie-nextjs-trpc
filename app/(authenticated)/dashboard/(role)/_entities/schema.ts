import { z } from "zod";

export const createOrUpdateRoleSchema = z
    .object({
        name: z
            .string({ required_error: "Nama Wajib Diisi", message: "Nama harus berupa string"})
            .min(1, { message: "Nama wajib diisi" }),
        permissions: z
            .array(z.string({ message: "Permission harus berupa string" }))
            .nonempty({ message: "Minimal satu permission harus dipilih" }),
    });

export type TCreateOrUpdateRoleForm = z.infer<typeof createOrUpdateRoleSchema>;