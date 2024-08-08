"use server";
import { hashPassword } from "@/libs/auth/password";
import { TMetaItem, TMetaResponse } from "@/types/meta";
import { calculateTotalPages, metaResponsePrefix } from "@/utils/index";
import { User } from "@/libs/drizzle/schemas/user.schema";
import {
  createUser,
  deleteUserById,
  findOneUserByEmail,
  findOneUserById,
  updateUserById,
  userPagination,
} from "../repositories/user.repository";
import { TCreateOrUpdateUserRequest } from "../entities/create-or-update.validation";
import { findOneRoleById } from "@/server/role/repositories/role.repository";

export const getUsers = async (meta: TMetaItem): Promise<TMetaResponse<User[]>> => {
  const page = meta.page;
  const perPage = meta.perPage;
  const data = await userPagination(meta);
  const totalPage = calculateTotalPages(data.count, perPage);
  const nextPage = page < totalPage ? page + 1 : null;
  const prevPage = page > 1 ? page - 1 : null;

  const metaPrefix: TMetaResponse<User[]> = {
    data: data.users,
    meta: {
      page,
      perPage,
      totalPage,
      nextPage,
      prevPage,
    },
  };

  return metaResponsePrefix(metaPrefix);
};

export const getUser = async (from?: string) => {
  if (!from) return undefined;
  const user = await findOneUserById(from);
  return user;
};

export const createUserAction = async (value: TCreateOrUpdateUserRequest) => {
  // Simulate error
  if (value.fullname === "error") throw new Error("fullname can not be error");

  const role = await findOneRoleById(value.roleId);
  if (!role) {
    throw new Error("Role tidak ditemukan");
  }
  const email = await findOneUserByEmail(value.email);
  if (email) {
    throw new Error("Email sudah digunakan");
  }
  const password = await hashPassword(value.password);
  await createUser({
    ...value,
    password,
  } as User);
};

export const updateUserAction = async ({
  value,
  id,
}: {
  value: TCreateOrUpdateUserRequest;
  id: string;
}) => {
  const user = await findOneUserById(id);
  if (!user) {
    throw "User tidak ditemukan";
  }

  // Check if role exists
  const role = await findOneRoleById(value.roleId);
  if (!role) {
    throw new Error("Role tidak ditemukan");
  }

  // Check if email exists and is not the same as the current user
  const email = await findOneUserByEmail(value.email);
  if (email && email.id !== id) {
    throw new Error("Email sudah digunakan");
  }

  user.fullname = value.fullname;
  user.address = value.address;
  user.password = await hashPassword(value.password);
  user.email = value.email;
  user.roleId = value.roleId;

  await updateUserById(id, user);
};

export const deleteUserAction = async (from: string) => {
  await deleteUserById(from);
};
