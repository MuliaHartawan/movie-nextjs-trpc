import { TMetaItem, TMetaResponse } from "@/types/meta";
import { db } from "@/libs/drizzle/connection";
import { asc, count, eq, sql } from "drizzle-orm";
import { User } from "@/libs/drizzle/schemas/user.schema";
import { users } from "@/libs/drizzle/schema";

export const userPagination = async (
  meta: TMetaItem,
): Promise<{ users: User[]; count: number }> => {
  const page = meta.page;
  const perPage = meta.perPage;
  const offset = (page - 1) * perPage;
  const search = meta?.search;

  const query = db.select().from(users);

  if (search) {
    query.where(sql`lower(${users.fullname}) like lower('%' || ${search} || '%')`);
  }

  const data = await query
    .limit(perPage)
    .offset(offset)
    .orderBy(users.createdAt, asc(users.createdAt));

  const dataCount = await db
    .select({ count: count(users.id) })
    .from(users)
    .then((res) => res[0].count);

  return {
    users: data,
    count: dataCount,
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
