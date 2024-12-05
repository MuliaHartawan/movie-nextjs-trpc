import prisma from "@/libs/prisma/prisma";
import { Movie } from "@prisma/client";
import { MovieDto } from "../dtos/movie.dto";

export const findMovie = async (): Promise<Movie[] | null> => {
  return await prisma.movie.findMany();
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
      posterUrl: movie.poster,
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
      posterUrl: movie.poster,
      genres: {
        connect: movie.genreIds.map((genreId) => ({
          id: genreId,
        })),
      },
    },
  });
};

export const deleteMovieById = async (id: string): Promise<void> => {
  prisma.movie.delete({
    where: {
      id,
    },
  });
};
