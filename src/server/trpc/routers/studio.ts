import { z } from "zod";
import { publicProcedure, router } from "../router";
import {
  createStudioAction,
  deleteStudioAction,
  getStudioAction,
  getStudiosAction,
  updateStudioAction,
} from "@/server/studio/actions/studio.action";
import { createOrUpdateStudioSchema } from "@/server/studio/validations/create-or-update-studio.validation";
import { TIndexStudioQueryParam } from "@/server/studio/validations/index-studio.validation";

export const studioRouter = router({
  getStudios: publicProcedure
    .input(z.custom<TIndexStudioQueryParam>())
    .query(({ input }) => getStudiosAction(input)),

  getStudio: publicProcedure.input(z.string()).query(({ input }) => getStudioAction(input)),

  createStudio: publicProcedure
    .input(createOrUpdateStudioSchema)
    .mutation(({ input }) => createStudioAction(input)),

  updateStudio: publicProcedure
    .input(
      z.object({
        value: createOrUpdateStudioSchema,
        id: z.string(),
      }),
    )
    .mutation(({ input }) => updateStudioAction(input)),

  deleteStudio: publicProcedure
    .input(z.string())
    .mutation(({ input }) => deleteStudioAction(input)),
});
