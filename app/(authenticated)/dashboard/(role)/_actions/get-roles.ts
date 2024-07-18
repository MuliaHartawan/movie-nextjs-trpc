"use server";
import { db } from "@/libs/drizzle/connection";
import { roles } from "@/libs/drizzle/schema";
import { TMetaItem, TMetaResponse } from "@/types/meta";
import { createSelectSchema } from "drizzle-zod";
import { z } from "zod";
import { asc, sql } from "drizzle-orm";
import { calculateTotalPages, metaResponsePrefix } from "@/utils";
import { ErrorMapper } from "@/common/types/error-500-mapper.types";

const selectRoleSchema = createSelectSchema(roles, {
  // Permissions is an array of strings
  permissions: z.array(z.string()),
});

export type Role = z.infer<typeof selectRoleSchema>;

export const getRoles = async (meta: TMetaItem): Promise<TMetaResponse<Role[]>> => {
  const page = meta?.page || 1;
  const perPage = meta?.perPage || 8;
  const offset = (page - 1) * perPage;
  const search = meta?.search;

  try {
    const query = db
      .select()
      .from(roles);

    if (search) {
      query.where(sql`lower(${roles.name}) like lower('%' || ${search} || '%')`);
    }

    const data = await query
      .limit(perPage)
      .offset(offset)
      .orderBy(roles.createdAt, asc(roles.createdAt));

    const count = await db
      .select({ id: roles.id })
      .from(roles)
      .then((res) => res.length);

    const totalPage = calculateTotalPages(count, perPage);
    const nextPage = page < totalPage ? page + 1 : null;
    const prevPage = page > 1 ? page - 1 : null;

    const metaPrefix: TMetaResponse<Role[]> = {
      data,
      meta: {
        code: 200,
        status: "success",
        message: "Berhasil menampilkan Role",
        page,
        perPage,
        totalPage,
        nextPage,
        prevPage,
      },
    };

    return metaResponsePrefix(metaPrefix);
  } catch (error) {
    const errorResponse: ErrorMapper<Role[]> = {
      meta: {
        code: 500,
        status: "error",
        message: error as string,
      },
      data: [],
    };

    return errorResponse;
  }
};

// Get all roles (for dropdown at form user)
export const getRolesWithSearch = async (search: string): Promise<Role[] | TMetaItem> => {
  try {
      const query = db
          .select()
          .from(roles);

      if (search) {
          query.where(sql`lower(${roles.name}) like lower('%' || ${search} || '%')`);
      }

      return await query;
  } catch (error) {
      return {
          code: 500,
          message: "Terjadi kesalahan",
      };
  }
}