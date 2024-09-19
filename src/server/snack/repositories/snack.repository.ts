import { TPaginationResponse } from "@/types/meta";
import { countOffset, mapMeta } from "@/utils/datatable";
import { TIndexSnackQueryParam } from "../validations/index-snack.validation";
import { Snack } from "@prisma/client";
import prisma from "@/libs/prisma/prisma";

export const snackPagination = async (
  queryParam: TIndexSnackQueryParam,
): Promise<TPaginationResponse<Snack[]>> => {
  const data = await prisma.snack.findMany({
    take: queryParam.perPage,
    skip: countOffset(queryParam),
    where: {
      OR: [
        {
          name: {
            contains: queryParam.search,
            mode: "insensitive",
          },
        },
      ],
    },
    orderBy: {
      createdAt: "asc",
    },
  });

  const dataCount = await prisma.snack.count({
    where: {
      OR: [
        {
          name: {
            contains: queryParam.search,
            mode: "insensitive",
          },
        },
      ],
    },
  });

  const meta = mapMeta(dataCount, queryParam);

  return {
    data,
    meta,
  };
};

export const findOneSnackById = async (id: string) => {
  return await prisma.snack.findUnique({
    where: {
      id,
    },
  });
};

export const createNewSnack = async (data: Snack): Promise<void> => {
  await prisma.snack.create({
    data,
  });
};

export const updateSnackById = async (id: string, data: Snack): Promise<void> => {
  await prisma.snack.update({
    where: {
      id,
    },
    data,
  });
};

export const deleteSnackById = async (id: string): Promise<void> => {
  await prisma.snack.delete({
    where: {
      id,
    },
  });
};
