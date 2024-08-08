"use server";
import { TMetaItem, TMetaResponse } from "@/types/meta";
import {
  findOneRoleWithPermissionsById,
  findRolesWithSearch,
  rolePagination,
  createRoleAndPermissions,
  updateRoleAndPermissionsById,
  deleteRoleById,
} from "../repositories/role.repository";
import { calculateTotalPages, metaResponsePrefix } from "@/utils/index";
import { Role } from "@/libs/drizzle/schemas/role.schema";
import { TCreateOrUpdateRoleForm } from "../entities/validation";

export const getRoles = async (meta: TMetaItem): Promise<TMetaResponse<Role[]>> => {
  const page = meta.page;
  const perPage = meta.perPage;
  const data = await rolePagination(meta);
  const totalPage = calculateTotalPages(data.count, perPage);
  const nextPage = page < totalPage ? page + 1 : null;
  const prevPage = page > 1 ? page - 1 : null;
  const metaPrefix: TMetaResponse<Role[]> = {
    data: data.roles as Role[],
    meta: {
      page,
      perPage,
      totalPage,
      nextPage,
      prevPage,
    },
  };
  return metaResponsePrefix(metaPrefix);
};

export const getRolesWithSearch = async (search: string): Promise<Role[] | TMetaItem> => {
  return await findRolesWithSearch(search);
};

export const getRoleAction = async (from: string): Promise<Role | undefined> => {
  return await findOneRoleWithPermissionsById(from);
};

export const createRole = async (value: TCreateOrUpdateRoleForm): Promise<void> => {
  await createRoleAndPermissions(value.name, value.permissionIds);
};

export const updateRole = async ({
  value,
  id,
}: {
  value: TCreateOrUpdateRoleForm;
  id: string;
}): Promise<void> => {
  await updateRoleAndPermissionsById(id, value.name, value.permissionIds);
};

export const deleteRole = async (id: string): Promise<void> => {
  await deleteRoleById(id);
};
