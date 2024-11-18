import { z } from "zod";
import { publicProcedure, router } from "../router";
import {
  getUsersAction,
  getUser,
  createUserAction,
  updateUserAction,
  deleteUserAction,
} from "@/server/user/actions/user.action";
import { createOrUpdateUserSchema } from "@/server/user/validations/create-or-update.validation";
import { TIndexUserQueryParam } from "@/server/user/validations/index-user.validation";

export const userRouter = router({
  getUsers: publicProcedure
    .input(z.custom<TIndexUserQueryParam>())
    .query(({ input }) => getUsersAction(input)),

  getUser: publicProcedure.input(z.string().optional()).query(({ input }) => getUser(input)),

  createUser: publicProcedure
    .input(createOrUpdateUserSchema)
    .mutation(({ input }) => createUserAction(input)),

  updateUser: publicProcedure
    .input(
      z.object({
        value: createOrUpdateUserSchema,
        id: z.string(),
      }),
    )
    .mutation(({ input }) => updateUserAction(input)),

  deleteUser: publicProcedure.input(z.string()).mutation(({ input }) => deleteUserAction(input)),
});
