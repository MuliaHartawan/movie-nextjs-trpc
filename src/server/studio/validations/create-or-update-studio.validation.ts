import { z } from "zod";

export const createOrUpdateStudioSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Nama Studio harus diisi" })
    .max(255, { message: "Nama Studio maksimal 255 karakter" }),

  capacity: z
    .number()
    .int({ message: "Kapasitas harus berupa angka bulat" })
    .positive({ message: "Kapasitas harus lebih besar dari 0" }),

  additionalFacilities: z
    .string()
    .max(1000, { message: "Fasilitas tambahan maksimal 1000 karakter" })
    .optional(),
});

export type TCreateOrUpdateStudioValidation = z.infer<typeof createOrUpdateStudioSchema>;
