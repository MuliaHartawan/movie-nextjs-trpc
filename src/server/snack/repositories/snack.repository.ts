import { TPaginationResponse } from "@/types/meta";
import { convertPaginationMeta } from "@/utils/paginate-util";
import { TIndexSnackQueryParam } from "../validations/index-snack.validation";
import { Snack } from "@prisma/client";
import prisma from "@/libs/prisma/prisma";

export const snackPagination = async (
  queryParam: TIndexSnackQueryParam,
): Promise<TPaginationResponse<Snack[]>> => {
  const [data, meta] = await prisma.snack
    .paginate({
      where: {
        // Search filter
        ...(queryParam.search
          ? {
              name: {
                contains: queryParam.search,
                mode: "insensitive",
              },
            }
          : {}),
      },
      orderBy: {
        ...(queryParam.sort && queryParam.order
          ? {
              [queryParam.sort]: queryParam.order,
            }
          : {
              createdAt: "asc",
            }),
      },
    })
    .withPages({
      limit: queryParam.perPage,
      page: queryParam.page,
    });

  return {
    data,
    meta: convertPaginationMeta(meta, queryParam),
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
