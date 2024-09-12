import { TPaginationResponse } from "@/types/meta";
import { countOffset, mapMeta } from "@/utils/paginate-util";
import { TIndexRoleQueryParam } from "../validations/index-role.validation";
import prisma from "@/libs/prisma/prisma";
import { Role } from "@prisma/client";

export const rolePagination = async (
  queryParam: TIndexRoleQueryParam,
): Promise<TPaginationResponse<Role[]>> => {
  const data = await prisma.role.findMany({
    take: queryParam.perPage,
    skip: countOffset(queryParam),
    where: {
      OR: [
        {
          name: {
            contains: queryParam.search,
          },
        },
      ],
    },
    orderBy: {
      createdAt: "asc",
    },
  });

  const dataCount = await prisma.role.count({
    where: {
      OR: [
        {
          name: {
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

export const findRolesWithSearch = async (search: string): Promise<Role[]> => {
  return await prisma.role.findMany({
    where: {
      name: {
        contains: search,
      },
    },
  });
};

export const findOneRoleById = async (id: string): Promise<Role | null> => {
  return await prisma.role.findUnique({
    where: {
      id,
    },
  });
};

export const findOneRoleWithPermissionsById = async (id: string): Promise<Role | null> => {
  return await prisma.role.findUnique({
    where: {
      id,
    },
    include: {
      rolePermissions: {
        include: {
          permission: true,
        },
      },
    },
  });
};

export const createRoleAndPermissions = async (
  name: string,
  permissionIds: string[],
): Promise<void> => {
  await prisma.role.create({
    data: {
      name,
      rolePermissions: {
        createMany: {
          data: permissionIds.map((permissionId) => ({
            permissionId,
          })),
        },
      },
    },
  });
};

export const updateRoleAndPermissionsById = async (
  id: string,
  name: string,
  permissionIds: string[],
): Promise<void> => {
  await prisma.role.update({
    where: {
      id,
    },
    data: {
      name,
      rolePermissions: {
        deleteMany: {},
        createMany: {
          data: permissionIds.map((permissionId) => ({
            permissionId,
          })),
        },
      },
    },
  });
};

export const deleteRoleById = async (id: string): Promise<void> => {
  await prisma.$transaction([
    prisma.role.delete({
      where: {
        id,
      },
    }),
    prisma.rolePermission.deleteMany({
      where: {
        roleId: id,
      },
    }),
  ]);
};
