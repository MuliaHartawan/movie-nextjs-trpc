import { TPaginationResponse } from "@/types/meta";
import { countOffset, mapMeta } from "@/utils/paginate-util";
import { TIndexSnackQueryParam } from "../validations/index-snack.validation";
import { Snack } from "@prisma/client";
import prisma from "@/libs/prisma/prisma";
import { paginate } from "@/server/utils/prisma";

export const snackPagination = async (
  queryParam: TIndexSnackQueryParam,
): Promise<TPaginationResponse<Snack[]>> => {
  const { items, count } = await paginate<"Snack", Snack>({
    model: "Snack",
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

  return {
    data: items,
    meta: mapMeta(count, queryParam),
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
