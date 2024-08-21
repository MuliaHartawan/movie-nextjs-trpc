import { db } from "@/libs/drizzle/connection";
import { snacks } from "@/libs/drizzle/schema";
import { Snack } from "@/libs/drizzle/schemas/snack.schema";
import { TPaginationResponse } from "@/types/meta";
import { countOffset, mapMeta } from "@/utils/paginate-util";
import { count, desc, eq, sql } from "drizzle-orm";
import { TIndexSnackQueryParam } from "../validations/index-snack.validation";

export const snackPagination = async (
  queryParam: TIndexSnackQueryParam,
): Promise<TPaginationResponse<Snack[]>> => {
  const query = db.select().from(snacks);

  if (queryParam.search) {
    query.where(sql`lower(${snacks.name}) like lower('%' || ${queryParam.search} || '%')`);
  }

  const data = await query
    .limit(queryParam.perPage)
    .offset(countOffset(queryParam))
    .orderBy(snacks.createdAt, desc(snacks.createdAt));

  const dataCount = await db
    .select({ count: count(snacks.id) })
    .from(snacks)
    .then((res) => res[0].count);

  const meta = mapMeta(dataCount, queryParam);

  return {
    data,
    meta,
  };
};

export const findOneSnackById = async (id: string): Promise<Snack | undefined> => {
  return await db.query.snacks.findFirst({
    where: eq(snacks.id, id),
  });
};

export const createNewSnack = async (data: Snack): Promise<void> => {
  await db.insert(snacks).values(data);
};

export const updateSnackById = async (id: string, data: Snack): Promise<void> => {
  await db.update(snacks).set(data).where(eq(snacks.id, id));
};

export const deleteSnackById = async (id: string): Promise<void> => {
  await db.delete(snacks).where(eq(snacks.id, id));
};