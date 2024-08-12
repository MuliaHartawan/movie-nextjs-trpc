"use server";
import { Snack } from "@/libs/drizzle/schemas/snack.schema";
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

export const getSnacksAction = async (
  queryParam: TIndexSnackQueryParam,
): Promise<TPaginationResponse<Snack[]>> => {
  return snackPagination(queryParam);
};

export const getSnackAction = async (from: string) => {
  const snack = await findOneSnackById(from);

  if (!snack) {
    throw new Error("Snack tidak ditemukan");
  }

  return snack;
};

export const createSnackAction = async (value: TCreateOrUpdateSnackValidation) => {
  // Validation
  validate(createOrUpdateSnackSchema, value);

  await createNewSnack({
    name: value.name,
    cost: value.cost,
    expiryDate: new Date(value.expiryDate),
  });
};

export const updateSnackAction = async ({
  value,
  id,
}: {
  value: TCreateOrUpdateSnackValidation;
  id: string;
}) => {
  // Validation
  validate(createOrUpdateSnackSchema, value);

  await updateSnackById(id, {
    name: value.name,
    cost: value.cost,
    expiryDate: new Date(value.expiryDate),
  });
};

export const deleteSnackAction = async (id: string) => {
  await deleteSnackById(id);
};
