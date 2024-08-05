import { Snack } from "@/libs/drizzle/schemas/snack.schema";
import { TMetaItem, TMetaResponse } from "@/types/meta";
import { calculateTotalPages, metaResponsePrefix } from "@/utils";
import { snackPagination } from "../repositories/snack.repository";

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
