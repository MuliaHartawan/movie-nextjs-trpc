import { TPaginationResponse } from "@/types/meta";
import { convertPaginationMeta } from "@/utils/datatable";
import { TIndexUserQueryParam } from "../validations/index-user.validation";
import prisma, { prismaWithTrashed } from "@/libs/prisma/prisma";
import { User } from "@prisma/client";
import { UserWithRole } from "@/libs/prisma/types/user-with-role";

export const userPagination = async (
  queryParam: TIndexUserQueryParam,
): Promise<TPaginationResponse<UserWithRole[]>> => {
  const [data, meta] = await (queryParam.withTrashed === 1 ? prismaWithTrashed : prisma).user
    .paginate({
      include: {
        role: true,
      },
      where: {
        // Search filter
        ...(queryParam.search
          ? {
              fullname: {
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

export const findOneUserById = async (id: string) => {
  return await prisma.user.findUnique({
    where: {
      id,
    },
  });
};

export const findOneUserWithRoleById = async (id: string) => {
  return await prisma.user.findUnique({
    include: {
      role: true,
    },
    where: {
      id,
    },
  });
};

export const findOneUserByEmail = async (email: string) => {
  return await prisma.user.findUnique({
    where: {
      email,
    },
  });
};

export const isEmailAlreadyUsed = async (email: string) => {
  const registeredEmail = await prisma.user.count({
    where: {
      email,
    },
  });

  return registeredEmail > 0;
};

export const createUser = async (data: User) => {
  await prisma.user.create({
    data,
  });
};

export const updateUserById = async (id: string, data: User) => {
  await prisma.user.update({
    where: {
      id,
    },
    data,
  });
};

export const deleteUserById = async (id: string) => {
  await prisma.user.delete({
    where: {
      id,
    },
  });
};
