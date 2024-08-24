"use server";
import { TPaginationResponse } from "@/types/meta";
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
import { TIndexRoleQueryParam } from "../validations/index-role.validation";

export const getRolesAction = async (
  queryParam: TIndexRoleQueryParam,
): Promise<TPaginationResponse<Role[]>> => {
  return await rolePagination(queryParam);
};

export const getRolesWithSearch = async (search: string): Promise<Role[]> => {
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
