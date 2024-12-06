import { z } from "zod";

export const createOrUpdateScreenScheduleSchema = z.object({
  screeningTime: z.date({ message: "Screening Time harus berupa tanggal yang valid" }),

  price: z
    .number()
    .positive({ message: "Harga harus lebih besar dari 0" })
    .min(0, { message: "Harga tidak boleh negatif" }),

  studioId: z.string().uuid({ message: "Studio ID harus berupa UUID yang valid" }),

  movieId: z.string().uuid({ message: "Movie ID harus berupa UUID yang valid" }),
});

export type TCreateOrUpdateScreenScheduleValidation = z.infer<
  typeof createOrUpdateScreenScheduleSchema
>;
