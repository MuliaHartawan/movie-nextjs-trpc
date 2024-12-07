import { getMoviesAction } from "@/server/movie/actions/movie.action";
import { TIndexMovieQueryParam } from "@/server/movie/validations/index-movie.validation";
import { useQuery } from "@tanstack/react-query";

export const useMovieQuery = (parameter: TIndexMovieQueryParam) => {
  return useQuery({
    queryKey: ["movies", parameter],
    queryFn: () => getMoviesAction(parameter),
  });
};

export const useMoviesOptionQuery = (parameter: TIndexMovieQueryParam) => {
  return useQuery({
    queryKey: ["movies-option", parameter],
    queryFn: () => getMoviesAction(parameter),
    select: (rolesQuery) => {
      return Array.isArray(rolesQuery.data)
        ? rolesQuery.data.map((value) => ({
            value: value.id!,
            label: value.title,
          }))
        : [];
    },
  });
};
