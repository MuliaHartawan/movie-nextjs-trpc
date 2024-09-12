import { TPaginationResponse } from "@/types/meta";
import { countOffset, mapMeta } from "@/utils/paginate-util";
import { TIndexUserQueryParam } from "../validations/index-user.validation";
import prisma from "@/libs/prisma/prisma";
import { User } from "@prisma/client";

export const userPagination = async (
  queryParam: TIndexUserQueryParam,
): Promise<TPaginationResponse<User[]>> => {
  const data = await prisma.user.findMany({
    take: queryParam.perPage,
    skip: countOffset(queryParam),
    where: {
      OR: [
        // Search by fullname
        {
          fullname: {
            contains: queryParam.search,
          },
        },
      ],
    },
    orderBy: {
      createdAt: "asc",
    },
  });

  const dataCount = await prisma.user.count({
    where: {
      OR: [
        // Search by fullname
        {
          fullname: {
            contains: queryParam.search,
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

export const findOneUserById = async (id: string): Promise<User | undefined> => {
  return (
    (await prisma.user.findUnique({
      where: {
        id,
      },
    })) ?? undefined
  );
};

export const findOneUserByEmail = async (email: string): Promise<User | null> => {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  return user;
};

export const isEmailAlreadyUsed = async (email: string, userEmail?: string) => {
  const registeredEmail = await prisma.user.count({
    where: {
      email,
      OR: [
        {
          email: {
            not: userEmail,
          },
        },
      ],
    },
  });

  return registeredEmail > 0;
};

export const createUser = async (data: User): Promise<void> => {
  await prisma.user.create({
    data,
  });
};

export const updateUserById = async (id: string, data: Partial<User>): Promise<void> => {
  await prisma.user.update({
    where: {
      id,
    },
    data,
  });
};

export const deleteUserById = async (id: string): Promise<void> => {
  await prisma.user.delete({
    where: {
      id,
    },
  });
};
