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
import {
  createOrUpdateRoleSchema,
  TCreateOrUpdateRoleValidation,
} from "../validations/create-or-update-role.validation";
import { TIndexRoleQueryParam } from "../validations/index-role.validation";
import { validate } from "@/utils/zod-validate";
import { serverCheckPermission } from "@/utils/permission";
import { PERMISSIONS } from "@/common/enums/permissions.enum";

export const getRolesAction = async (
  queryParam: TIndexRoleQueryParam,
): Promise<TPaginationResponse<Role[]>> => {
  return await rolePagination(queryParam);
};

export const getRolesWithSearch = async (search: string): Promise<Role[]> => {
  // Permission authorization
  await serverCheckPermission([PERMISSIONS.ROLE_READ]);

  return await findRolesWithSearch(search);
};

export const getRoleAction = async (from: string): Promise<Role | undefined> => {
  // Permission authorization
  await serverCheckPermission([PERMISSIONS.ROLE_DETAIL]);

  return await findOneRoleWithPermissionsById(from);
};

export const createRole = async (value: TCreateOrUpdateRoleValidation): Promise<void> => {
  // Permission authorization
  await serverCheckPermission([PERMISSIONS.ROLE_CREATE]);

  // Validation
  await validate(createOrUpdateRoleSchema, value);

  await createRoleAndPermissions(value.name, value.permissionIds);
};

export const updateRole = async ({
  value,
  id,
}: {
  value: TCreateOrUpdateRoleValidation;
  id: string;
}): Promise<void> => {
  // Permission authorization
  await serverCheckPermission([PERMISSIONS.ROLE_UPDATE]);

  // Validation
  await validate(createOrUpdateRoleSchema, value);

  await updateRoleAndPermissionsById(id, value.name, value.permissionIds);
};

export const deleteRole = async (id: string): Promise<void> => {
  // Permission authorization
  await serverCheckPermission([PERMISSIONS.ROLE_DELETE]);

  await deleteRoleById(id);
};
