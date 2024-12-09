import { Dayjs } from "dayjs";

export type TScheduleCollumn = {
  id: string;
  screeningTime: Date;
  price: number;
  studioId: string;
  movieId: string;
};

export type TScheduleCreateOrUpdateForm = {
  screeningTime: Dayjs;
  price: number;
  studioId: string;
  movieId: string;
};
