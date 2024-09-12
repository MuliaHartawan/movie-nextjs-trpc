"use server";

import { TPaginationResponse } from "@/types/meta";
import {
  createNewSnack,
  deleteSnackById,
  findOneSnackById,
  snackPagination,
  updateSnackById,
} from "../repositories/snack.repository";
import {
  createOrUpdateSnackSchema,
  TCreateOrUpdateSnackValidation,
} from "../validations/create-or-update-snack.validation";
import { validate } from "@/utils/zod-validate";
import { TIndexSnackQueryParam } from "../validations/index-snack.validation";
import { serverCheckPermission } from "@/utils/permission";
import { PERMISSIONS } from "@/common/enums/permissions.enum";
import { Snack } from "@prisma/client";
import NotFoundException from "../../../errors/NotFoundException";

export const getSnacksAction = async (
  queryParam: TIndexSnackQueryParam,
): Promise<TPaginationResponse<Snack[]>> => {
  // Permission authorization
  await serverCheckPermission([PERMISSIONS.SNACK_READ]);

  return snackPagination(queryParam);
};

export const getSnackAction = async (from: string) => {
  // Permission authorization
  await serverCheckPermission([PERMISSIONS.SNACK_DETAIL]);

  const snack = await findOneSnackById(from);

  if (!snack) {
    throw new NotFoundException("Snack tidak ditemukan");
  }

  return snack;
};

export const createSnackAction = async (value: TCreateOrUpdateSnackValidation) => {
  // Permission authorization
  await serverCheckPermission([PERMISSIONS.SNACK_CREATE]);

  // Validation
  await validate(createOrUpdateSnackSchema, value);

  await createNewSnack({
    name: value.name,
    price: value.price,
    expiredAt: new Date(value.expiredAt),
  } as Snack);
};

export const updateSnackAction = async ({
  value,
  id,
}: {
  value: TCreateOrUpdateSnackValidation;
  id: string;
}) => {
  // Permission authorization
  await serverCheckPermission([PERMISSIONS.SNACK_UPDATE]);

  // Validation
  await validate(createOrUpdateSnackSchema, value);

  await updateSnackById(id, {
    name: value.name,
    price: value.price,
    expiredAt: new Date(value.expiredAt),
  } as Snack);
};

export const deleteSnackAction = async (id: string) => {
  // Permission authorization
  await serverCheckPermission([PERMISSIONS.SNACK_DELETE]);

  await deleteSnackById(id);
};
