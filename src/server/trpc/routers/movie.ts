import { z } from "zod";
import { publicProcedure, router } from "../router";
import {
  createMovieAction,
  deleteMovieAction,
  getMovieAction,
  getMoviesAction,
  updateMovieAction,
} from "@/server/movie/actions/movie.action";
import { createOrUpdateMovieSchema } from "@/server/movie/validations/create-or-update-movie.validation";
import { TIndexMovieQueryParam } from "@/server/movie/validations/index-movie.validation";

export const movieRouter = router({
  getMovies: publicProcedure
    .input(z.custom<TIndexMovieQueryParam>())
    .query(({ input }) => getMoviesAction(input)),

  getMovie: publicProcedure.input(z.string()).query(({ input }) => getMovieAction(input)),

  createMovie: publicProcedure
    .input(createOrUpdateMovieSchema)
    .mutation(({ input }) => createMovieAction(input)),

  updateMovie: publicProcedure
    .input(
      z.object({
        value: createOrUpdateMovieSchema,
        id: z.string(),
      }),
    )
    .mutation(({ input }) => updateMovieAction(input)),

  deleteMovie: publicProcedure.input(z.string()).mutation(({ input }) => deleteMovieAction(input)),
});
