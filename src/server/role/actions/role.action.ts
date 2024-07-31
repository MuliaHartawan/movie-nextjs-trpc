import { TMetaItem, TMetaResponse } from "@/types/meta";
import { findOneRoleById, rolePagination } from "../repositories/role.repository";
import { Role } from "@/libs/drizzle/schema";
import { calculateTotalPages, metaResponsePrefix } from "@/utils";

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
      code: 200,
      status: "success",
      message: "Berhasil menampilkan order",
      page,
      perPage,
      totalPage,
      nextPage,
      prevPage,
    },
  };
  return metaResponsePrefix(metaPrefix);
};

export const getRole = async (from: string) => {
  const data = await findOneRoleById(from);
  return data;
};
