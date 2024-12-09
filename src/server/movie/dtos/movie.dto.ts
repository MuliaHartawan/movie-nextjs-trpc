import { Movie } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime/library";

export type MovieDto = Pick<
  Movie,
  "title" | "releaseDate" | "duration" | "description" | "rating"
> & {
  poster: string;
  genreIds: string[];
};
