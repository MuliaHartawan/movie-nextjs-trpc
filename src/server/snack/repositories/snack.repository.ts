import { db } from "@/libs/drizzle/connection";
import { snacks } from "@/libs/drizzle/schema";
import { Snack } from "@/libs/drizzle/schemas/snack.schema";
import { TMetaItem } from "@/types/meta";
import { count, desc, sql } from "drizzle-orm";

export const snackPagination = async (
  meta: TMetaItem,
): Promise<{ snacks: Snack[]; count: number }> => {
  const page = meta.page;
  const perPage = meta.perPage;
  const offset = (page - 1) * perPage;
  const search = meta?.search;
  const query = db.select().from(snacks);

  if (search) {
    query.where(sql`lower(${snacks.name}) like lower('%' || ${search} || '%')`);
  }

  const data = await query
    .limit(perPage)
    .offset(offset)
    .orderBy(snacks.createdAt, desc(snacks.createdAt));

  const dataCount = await db
    .select({ count: count(snacks.id) })
    .from(snacks)
    .then((res) => res[0].count);

  return {
    snacks: data,
    count: dataCount,
  };
};
