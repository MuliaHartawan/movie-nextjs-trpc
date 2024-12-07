import prisma from "@/libs/prisma/prisma";
import { ScreeningSchedule } from "@prisma/client";
import { ScreenScheduleDto } from "../dtos/screen-schedule.dto";
import { convertPaginationMeta } from "@/utils/datatable";
import { TIndexScreenScheduleQueryParam } from "../validations/index-screeen-schedule.validation";
import { TPaginationResponse } from "@/types/meta";

export const findScreenSchedule = async (
  queryParam: TIndexScreenScheduleQueryParam,
): Promise<TPaginationResponse<ScreeningSchedule[]>> => {
  const { search, sort, order, perPage, page } = queryParam;

  const [data, meta] = await prisma.screeningSchedule
    .paginate({
      where: {
        ...(search
          ? {
              screeningTime: {
                equals: search,
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
              screeningTime: "asc",
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
  await prisma.screeningSchedule.delete({
    where: {
      id,
    },
  });
};
