import prisma from "@/libs/prisma/prisma";
import { Studio } from "@prisma/client";
import { StudioDto } from "../dtos/studio.dto";
import { convertPaginationMeta } from "@/utils/datatable";
import { TIndexStudioQueryParam } from "../validations/index-studio.validation";
import { TPaginationResponse } from "@/types/meta";

export const findStudio = async (
  queryParam: TIndexStudioQueryParam,
): Promise<TPaginationResponse<Studio[]>> => {
  const { search, sort, order, perPage, page } = queryParam;

  const [data, meta] = await prisma.studio
    .paginate({
      where: {
        ...(search
          ? {
              name: {
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
              id: "asc",
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

export const findOneStudioById = async (id: string): Promise<Studio | null> => {
  return await prisma.studio.findUnique({
    where: {
      id,
    },
  });
};

export const findOneStudioWithGenreById = async (id: string): Promise<Studio | null> => {
  return await prisma.studio.findUnique({
    where: {
      id,
    },
  });
};

export const createStudioAndGenres = async (studio: StudioDto): Promise<void> => {
  await prisma.studio.create({
    data: {
      name: studio.name,
      capacity: studio.capacity,
      additionalFacilities: studio.additionalFacilities,
    },
  });
};

export const updateStudioAndGenres = async (id: string, studio: StudioDto): Promise<void> => {
  await prisma.studio.update({
    where: {
      id,
    },
    data: {
      name: studio.name,
      capacity: studio.capacity,
      additionalFacilities: studio.additionalFacilities,
    },
  });
};

export const deleteStudioById = async (id: string): Promise<void> => {
  await prisma.studio.delete({
    where: {
      id,
    },
  });
};
