"use server";
import { hashPassword } from "@/libs/auth/password";
import { TCreateOrUpdateUserRequest } from "../_requests/create-or-update.request";
import { TMetaItem, TMetaResponse } from "@/types/meta";
import { calculateTotalPages, metaResponsePrefix } from "@/utils";
import { User } from "@/libs/drizzle/schemas/user.schema";
import {
  createUser,
  deleteUserById,
  findOneUserByEmail,
  findOneUserById,
  updateUserById,
  userPagination,
} from "../_repositories/user.repository";
import { findOneRoleById } from "../_repositories/role.repository";

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
    const user = await findOneUserById(from);
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
  // try {
  if (value.fullname === "error") throw new Error("fullname can not be error");
  const role = await findOneRoleById(value.roleId);

  if (!role) {
    return {
      status: "error",
      error: "Role tidak ditemukan",
    };
  }

  const email = await findOneUserByEmail(value.email);
  if (email) {
    return {
      status: "error",
      error: "Email sudah digunakan",
    };
  }

  const password = await hashPassword(value.password);

  await createUser({
    ...value,
    password,
  } as User);

  return {
    status: "success",
    message: "User created successfully",
  };
  // } catch (error) {
  //return {
  //  status: "error",
  //  error,
  // };
};

export const updateUserAction = async ({
  value,
  id,
}: {
  value: TCreateOrUpdateUserRequest;
  id: string;
}) => {
  try {
    const user = await findOneUserById(id);
    if (!user) {
      throw "User tidak ditemukan";
    }

    // Check if role exists
    const role = await findOneRoleById(value.roleId);
    if (!role) {
      return {
        error: {
          message: "Role tidak ditemukan",
        },
      };
    }

    // Check if email exists and is not the same as the current user
    const email = await findOneUserByEmail(value.email);
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

    await updateUserById(id, user);

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
    await deleteUserById(from);

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
