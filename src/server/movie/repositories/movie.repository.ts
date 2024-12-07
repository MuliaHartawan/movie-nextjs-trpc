import prisma from "@/libs/prisma/prisma";
import { Movie } from "@prisma/client";
import { MovieDto } from "../dtos/movie.dto";
import { TIndexMovieQueryParam } from "../validations/index-movie.validation";
import { TPaginationResponse } from "@/types/meta";
import { convertPaginationMeta } from "@/utils/datatable";

export const findMovie = async (
  queryParam: TIndexMovieQueryParam,
): Promise<TPaginationResponse<Movie[]>> => {
  const { search, sort, order, perPage, page } = queryParam;

  const [data, meta] = await prisma.movie
    .paginate({
      where: {
        ...(search
          ? {
              title: {
                contains: search,
              },
            }
          : {}),
      },
      orderBy: {
        ...(sort && order
          ? {
              [sort]: order,
            }
          : {
              createdAt: "asc",
            }),
      },
    })
    .withPages({
      limit: perPage,
      page: page,
    });

  return {
    data,
    meta: convertPaginationMeta(meta, queryParam),
  };
};

export const findOneMovieById = async (id: string): Promise<Movie | null> => {
  return await prisma.movie.findUnique({
    where: {
      id,
    },
    include: {
      movieGenres: {
        include: {
          genre: true,
        },
      },
    },
  });
};

export const findOneMovieWithGenreById = async (id: string): Promise<Movie | null> => {
  return await prisma.movie.findUnique({
    where: {
      id,
    },
  });
};

export const createMovieAndGenres = async (movie: MovieDto): Promise<void> => {
  await prisma.movie.create({
    data: {
      title: movie.title,
      releaseDate: movie.releaseDate,
      duration: movie.duration,
      description: movie.description,
      rating: movie.rating,
      poster: movie.poster,
      genres: {
        connect: movie.genreIds.map((genreId) => ({
          id: genreId,
        })),
      },
    },
  });
};

export const updateMovieAndGenres = async (id: string, movie: MovieDto): Promise<void> => {
  await prisma.movie.update({
    where: {
      id,
    },
    data: {
      title: movie.title,
      releaseDate: movie.releaseDate,
      duration: movie.duration,
      description: movie.description,
      rating: movie.rating,
      poster: movie.poster,
      genres: {
        connect: movie.genreIds.map((genreId) => ({
          id: genreId,
        })),
      },
    },
  });
};

export const deleteMovieById = async (id: string): Promise<void> => {
  await prisma.movie.delete({
    where: {
      id,
    },
  });
};
