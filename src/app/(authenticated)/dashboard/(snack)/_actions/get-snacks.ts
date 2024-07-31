"use server";
import { db } from "@/libs/drizzle/connection";
import { snacks } from "@/libs/drizzle/schema";
import { TMetaItem, TMetaResponse } from "@/types/meta";
import { createSelectSchema } from "drizzle-zod";
import { z } from "zod";
import { asc, sql } from "drizzle-orm";
import { calculateTotalPages, metaResponsePrefix } from "@/utils";
import { ErrorMapper } from "@/common/types/error-500-mapper.types";

const selectSnackSchema = createSelectSchema(snacks);

export type Snack = z.infer<typeof selectSnackSchema>;

export const getSnacks = async (meta: TMetaItem): Promise<TMetaResponse<Snack[]>> => {
  const page = meta?.page || 1;
  const perPage = meta?.perPage || 8;
  const offset = (page - 1) * perPage;
  const search = meta?.search;

  const query = db.select().from(snacks);

  if (search) {
    query.where(sql`lower(${snacks.name}) like lower('%' || ${search} || '%')`);
  }

  const data = await query
    .limit(perPage)
    .offset(offset)
    .orderBy(snacks.createdAt, asc(snacks.createdAt));

  const count = await db
    .select({ id: snacks.id })
    .from(snacks)
    .then((res) => res.length);

  const totalPage = calculateTotalPages(count, perPage);
  const nextPage = page < totalPage ? page + 1 : null;
  const prevPage = page > 1 ? page - 1 : null;

  const metaPrefix: TMetaResponse<Snack[]> = {
    data,
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
