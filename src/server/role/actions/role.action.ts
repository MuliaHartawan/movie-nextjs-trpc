"use server";
import { TMetaItem, TPaginationResponse } from "@/types/meta";
import {
  findOneRoleWithPermissionsById,
  findRolesWithSearch,
  rolePagination,
  createRoleAndPermissions,
  updateRoleAndPermissionsById,
  deleteRoleById,
} from "../repositories/role.repository";
import { Role } from "@/libs/drizzle/schemas/role.schema";
import { TCreateOrUpdateRoleForm } from "../entities/validation";

export const getRolesAction = async (meta: TMetaItem): Promise<TPaginationResponse<Role[]>> => {
  return await rolePagination(meta);
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
