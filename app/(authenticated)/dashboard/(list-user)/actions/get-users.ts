"use server";
import { db } from "@/libs/drizzle/connection";
import { users } from "@/libs/drizzle/schema";
import { TMetaItem, TMetaResponse } from "@/types/meta";
import { createSelectSchema } from "drizzle-zod";
import { z } from "zod";
import { asc } from "drizzle-orm";
import { calculateTotalPages, metaResponsePrefix } from "@/utils";

const selectUserSchema = createSelectSchema(users);

export type User = z.infer<typeof selectUserSchema>;

export const getUsers = async (meta: TMetaItem): Promise<TMetaResponse<User[]>> => {
  const page = meta?.page || 1;
  const perPage = meta?.perPage || 8;
  const offset = (page - 1) * perPage;

  const data = await db
    .select()
    .from(users)
    .limit(perPage)
    .offset(offset)
    .orderBy(users.createdAt, asc(users.createdAt));

  const count = await db
    .select({ id: users.id })
    .from(users)
    .then((res) => res.length);

  const totalPage = calculateTotalPages(count, perPage);
  const nextPage = page < totalPage ? page + 1 : null;
  const prevPage = page > 1 ? page - 1 : null;

  const metaPrefix: TMetaResponse<User[]> = {
    data,
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
