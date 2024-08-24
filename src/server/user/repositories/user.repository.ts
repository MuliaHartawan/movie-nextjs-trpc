import { TMetaItem, TPaginationResponse } from "@/types/meta";
import { db } from "@/libs/drizzle/connection";
import { count, desc, eq, sql } from "drizzle-orm";
import { User } from "@/libs/drizzle/schemas/user.schema";
import { users } from "@/libs/drizzle/schema";
import { TIndexSnackQueryParam } from "@/server/snack/validations/index-snack.validation";
import { countOffset, mapMeta } from "@/utils/paginate-util";

export const userPagination = async (
  queryParam: TIndexSnackQueryParam,
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

export const createUser = async (data: User): Promise<void> => {
  db.insert(users).values(data);
};

export const updateUserById = async (id: string, data: Partial<User>): Promise<void> => {
  db.update(users).set(data).where(eq(users.id, id));
};

export const deleteUserById = async (id: string): Promise<void> => {
  db.delete(users).where(eq(users.id, id));
};
