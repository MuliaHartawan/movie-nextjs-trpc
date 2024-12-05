import { PERMISSIONS } from "@/common/enums/permissions.enum";
import {
  createOrUpdateMovieSchema,
  TCreateOrUpdateMovieValidation,
} from "../validations/create-or-update-role.validation";
import { serverCheckPermission } from "@/utils/permission";
import { validate } from "@/utils/zod-validate";
import {
  createMovieAndGenres,
  deleteMovieById,
  findMovie,
  findOneMovieById,
  updateMovieAndGenres,
} from "../repositories/movie.repository";
import { saveMoviePoster } from "../attachments/movie.attachment";

export const getMoviesAction = async () => {
  return await findMovie();
};

export const getMovieAction = async (id: string) => {
  // Permission authorization
  await serverCheckPermission([PERMISSIONS.ROLE_DETAIL]);

  return await findOneMovieById(id);
};

export const createMovieAction = async (value: TCreateOrUpdateMovieValidation) => {
  // Permission authorization
  await serverCheckPermission([PERMISSIONS.MOVIE_CREATE]);

  // Validation
  await validate(createOrUpdateMovieSchema, value);

  // Store image
  const poster: string = await saveMoviePoster(value.poster);

  await createMovieAndGenres({
    title: value.title,
    releaseDate: value.releaseDate,
    duration: value.duration,
    description: value.description ?? null,
    rating: value.rating,
    poster: poster,
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

  // Store image
  const poster: string = await saveMoviePoster(value.poster);

  await updateMovieAndGenres(id, {
    title: value.title,
    releaseDate: value.releaseDate,
    duration: value.duration,
    description: value.description ?? null,
    rating: value.rating,
    poster: poster,
    genreIds: value.genreIds,
  });
};

export const deleteMovieAction = async (id: string) => {
  // Permission authorization
  await serverCheckPermission([PERMISSIONS.MOVIE_DELETE]);

  await deleteMovieById(id);
};
