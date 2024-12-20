import { REGEX_ENUM } from "@/common/enums/regex-enum";
import { z } from "zod";

export const createOrUpdateScreenScheduleSchema = z.object({
  screeningTime: z
    .string({
      message: "screening Tim harus berupa string",
    })
    .regex(REGEX_ENUM.DATE_FORMAT_YYYY_MM_DD, { message: "Format release date harus YYYY-MM-DD" }),

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
