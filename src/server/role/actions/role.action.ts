"use server";
import {
  findOneRoleWithPermissionsById,
  rolePagination,
  createRoleAndPermissions,
  updateRoleAndPermissionsById,
  deleteRoleById,
  findRolesBySearch,
} from "../repositories/role.repository";
import {
  createOrUpdateRoleSchema,
  TCreateOrUpdateRoleValidation,
} from "../validations/create-or-update-role.validation";
import { TIndexRoleQueryParam } from "../validations/index-role.validation";
import { validate } from "@/utils/zod-validate";
import { serverCheckPermission } from "@/utils/permission";
import { PERMISSIONS } from "@/common/enums/permissions.enum";

export const getRolesAction = async (queryParam: TIndexRoleQueryParam) => {
  return await rolePagination(queryParam);
};

export const getRolesBySearch = async (search: string) => {
  // Permission authorization
  await serverCheckPermission([PERMISSIONS.ROLE_READ]);

  return await findRolesBySearch(search);
};

export const getRoleAction = async (from: string) => {
  // Permission authorization
  await serverCheckPermission([PERMISSIONS.ROLE_DETAIL]);

  return await findOneRoleWithPermissionsById(from);
};

export const createRole = async (value: TCreateOrUpdateRoleValidation) => {
  // Permission authorization
  await serverCheckPermission([PERMISSIONS.ROLE_CREATE]);

  // Validation
  await validate(createOrUpdateRoleSchema, value);

  await createRoleAndPermissions({ name: value.name, permissionIds: value.permissionIds });
};

export const updateRole = async ({
  value,
  id,
}: {
  value: TCreateOrUpdateRoleValidation;
  id: string;
}) => {
  // Permission authorization
  await serverCheckPermission([PERMISSIONS.ROLE_UPDATE]);

  // Validation
  await validate(createOrUpdateRoleSchema, value);

  await updateRoleAndPermissionsById(id, {
    name: value.name,
    permissionIds: value.permissionIds,
  });
};

export const deleteRole = async (id: string) => {
  // Permission authorization
  await serverCheckPermission([PERMISSIONS.ROLE_DELETE]);

  await deleteRoleById(id);
};
