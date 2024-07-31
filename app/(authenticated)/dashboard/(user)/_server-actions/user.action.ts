"use server";
import { hashPassword } from "@/libs/auth/password";
import { db } from "@/libs/drizzle/connection";
import { roles, users } from "@/libs/drizzle/schema";
import { asc, eq, sql } from "drizzle-orm";
import { TCreateOrUpdateUserRequest } from "../_requests/create-or-update.request";
import { TMetaItem, TMetaResponse } from "@/types/meta";
import { calculateTotalPages, metaResponsePrefix } from "@/utils";
import { User } from "@/libs/drizzle/schemas/user.schema";

export const getUsers = async (meta: TMetaItem): Promise<TMetaResponse<User[]>> => {
  const page = meta?.page || 1;
  const perPage = meta?.perPage || 8;
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

// Param from is id of user
export const getUserAction = async (from: string) => {
  try {
    const user = (await db.select().from(users).where(eq(users.id, from))).at(0);
    if (!user) {
      throw "User tidak ditemukan";
    }

    return {
      success: {
        data: user,
      },
    };
  } catch (error) {
    return {
      error: {
        message: error as string,
      },
    };
  }
};

export const createUserAction = async (value: TCreateOrUpdateUserRequest) => {
  try {
    const role = (await db.select().from(roles).where(eq(roles.id, value.roleId))).at(0);

    if (!role) {
      return {
        status: "error",
        error: "Role tidak ditemukan",
      };
    }

    const email = (await db.select().from(users).where(eq(users.email, value.email))).at(0);
    if (email) {
      return {
        status: "error",
        error: "Email sudah digunakan",
      };
    }

    const password = await hashPassword(value.password);

    await db.insert(users).values({
      ...value,
      password,
    });

    return {
      status: "success",
      message: "User created successfully",
    };
  } catch (error) {
    return {
      status: "error",
      error,
    };
  }
};

export const updateUserAction = async ({
  value,
  id,
}: {
  value: TCreateOrUpdateUserRequest;
  id: string;
}) => {
  try {
    const user = (await db.select().from(users).where(eq(users.id, id))).at(0);
    if (!user) {
      throw "User tidak ditemukan";
    }

    // Check if role exists
    const role = (await db.select().from(roles).where(eq(roles.id, value.roleId))).at(0);
    if (!role) {
      return {
        error: {
          message: "Role tidak ditemukan",
        },
      };
    }

    // Check if email exists and is not the same as the current user
    const email = (await db.select().from(users).where(eq(users.email, value.email))).at(0);
    if (email && email.id !== id) {
      return {
        error: {
          message: "Email sudah digunakan",
        },
      };
    }

    user.fullname = value.fullname;
    user.address = value.address;
    user.password = await hashPassword(value.password);
    user.email = value.email;
    user.roleId = value.roleId;

    await db.update(users).set(user).where(eq(users.id, id));

    return {
      success: {
        message: "User berhasil diubah",
      },
    };
  } catch (error) {
    return {
      error: {
        message: error as string,
      },
    };
  }
};

export const deleteUserAction = async (from: string) => {
  try {
    await db.delete(users).where(eq(users.id, from));

    return {
      success: {
        message: "User berhasil dihapus",
      },
    };
  } catch (error) {
    return {
      error: {
        message: error as string,
      },
    };
  }
};
