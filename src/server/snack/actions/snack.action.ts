"use server";
import { Snack } from "@/libs/drizzle/schemas/snack.schema";
import { TMetaItem, TMetaResponse } from "@/types/meta";
import { calculateTotalPages, metaResponsePrefix } from "@/utils";
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

export const getSnacks = async (meta: TMetaItem): Promise<TMetaResponse<Snack[]>> => {
  const page = meta.page;
  const perPage = meta.perPage;
  const data = await snackPagination(meta);
  const totalPage = calculateTotalPages(data.count, perPage);
  const nextPage = page < totalPage ? page + 1 : null;
  const prevPage = page > 1 ? page - 1 : null;

  const metaPrefix: TMetaResponse<Snack[]> = {
    data: data.snacks,
    meta: {
      code: 200,
      status: "success",
      message: "Berhasil menampilkan snack",
      page,
      perPage,
      totalPage,
      nextPage,
      prevPage,
    },
  };

  return metaResponsePrefix(metaPrefix);
};

export const getSnackAction = async (from: string) => {
  const snack = await findOneSnackById(from);

  if (!snack) {
    throw new Error("Snack tidak ditemukan");
  }

  return snack;
};

export const createSnackAction = async (value: TCreateOrUpdateSnackValidation) => {
  console.log("value", value);
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
