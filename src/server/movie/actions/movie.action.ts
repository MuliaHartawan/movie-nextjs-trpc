import { PERMISSIONS } from "@/common/enums/permissions.enum";
import {
  createOrUpdateMovieSchema,
  TCreateOrUpdateMovieValidation,
} from "../validations/create-or-update-movie.validation";
import { serverCheckPermission } from "@/utils/permission";
import { validate } from "@/utils/zod-validate";
import {
  createMovieAndGenres,
  deleteMovieById,
  findMovie,
  findOneMovieById,
  updateMovieAndGenres,
} from "../repositories/movie.repository";
import NotFoundException from "../../../errors/NotFoundException";
import { TIndexMovieQueryParam } from "../validations/index-movie.validation";

export const getMoviesAction = async (queryParam: TIndexMovieQueryParam) => {
  return await findMovie(queryParam);
};

export const getMovieAction = async (id: string) => {
  // Permission authorization
  await serverCheckPermission([PERMISSIONS.MOVIE_DETAIL]);

  return await findOneMovieById(id);
};

export const createMovieAction = async (value: TCreateOrUpdateMovieValidation) => {
  // Permission authorization
  await serverCheckPermission([PERMISSIONS.MOVIE_CREATE]);

  // Validation
  await validate(createOrUpdateMovieSchema, value);

  await createMovieAndGenres({
    title: value.title,
    releaseDate: new Date(value.releaseDate),
    duration: value.duration,
    description: value.description ?? null,
    rating: value.rating,
    poster: value.poster,
    genreIds: value.genreIds,
  });
};

export const updateMovieAction = async ({
  value,
  id,
}: {
  value: TCreateOrUpdateMovieValidation;
  id: string;
}) => {
  // Permission authorization
  await serverCheckPermission([PERMISSIONS.MOVIE_UPDATE]);

  // Validation
  await validate(createOrUpdateMovieSchema, value);

  await updateMovieAndGenres(id, {
    title: value.title,
    releaseDate: new Date(value.releaseDate),
    duration: value.duration,
    description: value.description ?? null,
    rating: value.rating,
    poster: value.poster,
    genreIds: value.genreIds,
  });
};

export const deleteMovieAction = async (id: string) => {
  // Permission authorization
  await serverCheckPermission([PERMISSIONS.MOVIE_DELETE]);

  await deleteMovieById(id);
};
