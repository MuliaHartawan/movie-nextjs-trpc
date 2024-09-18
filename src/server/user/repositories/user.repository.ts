import { TPaginationResponse } from "@/types/meta";
import { db } from "@/libs/drizzle/connection";
import { and, count, desc, eq, ne, sql } from "drizzle-orm";
import { User } from "@/libs/drizzle/schemas/user.schema";
import { users } from "@/libs/drizzle/schema";
import { TIndexUserQueryParam } from "../validations/index-user.validation";
import { countOffset, mapMeta } from "@/utils/datatable";

export const userPagination = async (
  queryParam: TIndexUserQueryParam,
): Promise<TPaginationResponse<User[]>> => {
  const query = db.select().from(users);

  if (queryParam.search) {
    query.where(sql`lower(${users.fullname}) like lower('%' || ${queryParam.search} || '%')`);
  }

  const data = await query
    .limit(queryParam.perPage)
    .offset(countOffset(queryParam))
    .orderBy(users.createdAt, desc(users.createdAt));

  const dataCount = await db
    .select({ count: count(users.id) })
    .from(users)
    .then((res) => res[0].count);

  const meta = mapMeta(dataCount, queryParam);

  return {
    data,
    meta,
  };
};

export const findOneUserById = async (id: string): Promise<User | undefined> => {
  return (await db.select().from(users).where(eq(users.id, id)).limit(1)).at(0);
};

export const findOneUserByEmail = async (email: string): Promise<User | undefined> => {
  return (await db.select().from(users).where(eq(users.email, email)).limit(1)).at(0);
};

export const isEmailAlreadyUsed = async (email: string, userEmail?: string): Promise<boolean> => {
  const result = (
    await db
      .select({
        exists: sql<number>`1`,
      })
      .from(users)
      .where(and(eq(users.email, email), userEmail ? ne(users.email, email) : undefined))
  ).at(0);

  if (result?.exists) return true;

  return false;
};

export const createUser = async (data: User): Promise<void> => {
  await db.insert(users).values(data);
};

export const updateUserById = async (id: string, data: Partial<User>): Promise<number | null> => {
  return (await db.update(users).set(data).where(eq(users.id, id))).rowCount;
};

export const deleteUserById = async (id: string): Promise<number | null> => {
  return (await db.delete(users).where(eq(users.id, id))).rowCount;
};
