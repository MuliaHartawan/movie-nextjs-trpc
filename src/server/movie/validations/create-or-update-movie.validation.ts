import { z } from "zod";

export const createOrUpdateMovieSchema = z.object({
  title: z
    .string({ required_error: "Title Wajib Diisi", message: "Title harus berupa string" })
    .min(1, { message: "Title wajib diisi" })
    .max(255, { message: "Title maksimal 255 karakter" }),

  releaseDate: z.date().refine((val) => !isNaN(val.getTime()), {
    message: "Release date harus berupa tanggal yang valid",
  }),

  duration: z
    .number()
    .int({ message: "Durasi harus berupa angka integer" })
    .positive({ message: "Durasi harus lebih besar dari 0" }),

  description: z.string().max(255, { message: "Deskripsi maksimal 1000 karakter" }).optional(),

  rating: z
    .number()
    .multipleOf(0.01)
    .refine((val) => val >= 0 && val <= 10, {
      message: "Rating harus berada di antara 0 hingga 10",
    }),

  poster: z
    .instanceof(File, { message: "Poster harus berupa file gambar" })
    .refine((file) => file && file.type.startsWith("image/"), {
      message: "Poster harus berupa file gambar",
    }),

  genreIds: z
    .array(z.string().uuid({ message: "Genre ID harus berupa UUID yang valid" }))
    .nonempty({ message: "Minimal satu genre harus dipilih" }),
});

export type TCreateOrUpdateMovieValidation = z.infer<typeof createOrUpdateMovieSchema>;
