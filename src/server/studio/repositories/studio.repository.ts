import prisma from "@/libs/prisma/prisma";
import { Studio } from "@prisma/client";
import { StudioDto } from "../dtos/studio.dto";

export const findStudio = async (): Promise<Studio[] | null> => {
  return await prisma.studio.findMany();
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
  prisma.studio.delete({
    where: {
      id,
    },
  });
};
