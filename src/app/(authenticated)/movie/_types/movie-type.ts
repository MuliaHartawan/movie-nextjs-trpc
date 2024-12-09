import { UploadFile } from "antd";
import { Dayjs } from "dayjs";
export type TMovieCollumn = {
  title: string;
  rating: number;
  id: string;
  description: string;
  duration: number;
};

export type TMovieData = {
  title: string;
  releaseDate: Date | null;
  rating: number | null;
  id: string;
  description: string | null;
  createdAt: Date;
  updatedAt: Date;
  duration: number | null;
  poster: string | null;
  movieGenres: string[] | null;
};

export type TMovieCreateOrUpdateForm = {
  title: string;
  releaseDate: Dayjs;
  rating: number;
  description: string;
  duration: number;
  movieGenres: string[];
  poster: any | null;
};
