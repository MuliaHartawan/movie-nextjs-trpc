import prisma from "@/libs/prisma/prisma";
import { ScreeningSchedule } from "@prisma/client";
import { ScreenScheduleDto } from "../dtos/screen-schedule.dto";

export const findScreenSchedule = async (): Promise<ScreeningSchedule[] | null> => {
  return await prisma.screeningSchedule.findMany();
};

export const findOneScreenScheduleById = async (id: string): Promise<ScreeningSchedule | null> => {
  return await prisma.screeningSchedule.findUnique({
    where: {
      id,
    },
  });
};

export const findOneScreenScheduleWithGenreById = async (
  id: string,
): Promise<ScreeningSchedule | null> => {
  return await prisma.screeningSchedule.findUnique({
    where: {
      id,
    },
  });
};

export const createScreenScheduleAndGenres = async (
  screeningSchedule: ScreenScheduleDto,
): Promise<void> => {
  await prisma.screeningSchedule.create({
    data: {
      screeningTime: screeningSchedule.screeningTime,
      price: screeningSchedule.price,
      movieId: screeningSchedule.movieId,
      studioId: screeningSchedule.studioId,
    },
  });
};

export const updateScreenScheduleAndGenres = async (
  id: string,
  screeningSchedule: ScreenScheduleDto,
): Promise<void> => {
  await prisma.screeningSchedule.update({
    where: {
      id,
    },
    data: {
      screeningTime: screeningSchedule.screeningTime,
      price: screeningSchedule.price,
      movieId: screeningSchedule.movieId,
      studioId: screeningSchedule.studioId,
    },
  });
};

export const deleteScreenScheduleById = async (id: string): Promise<void> => {
  prisma.screeningSchedule.delete({
    where: {
      id,
    },
  });
};
