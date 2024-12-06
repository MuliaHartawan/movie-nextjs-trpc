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

export const studioRouter = router({
  getStudios: publicProcedure.query(() => getStudiosAction()),

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
