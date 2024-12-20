import { z } from "zod";
import { publicProcedure, router } from "../router";
import {
  createScreenScheduleAction,
  deleteScreenScheduleAction,
  getScreenScheduleAction,
  getScreenSchedulesAction,
  updateScreenScheduleAction,
} from "@/server/screen-schedule/actions/screen-schedule.action";
import { createOrUpdateScreenScheduleSchema } from "@/server/screen-schedule/validations/create-or-update-screen-schedule.validation";
import { TIndexScreenScheduleQueryParam } from "@/server/screen-schedule/validations/index-screeen-schedule.validation";

export const screenScheduleRouter = router({
  getScreenSchedules: publicProcedure
    .input(z.custom<TIndexScreenScheduleQueryParam>())
    .query(({ input }) => getScreenSchedulesAction(input)),

  getScreenSchedule: publicProcedure
    .input(z.string())
    .query(({ input }) => getScreenScheduleAction(input)),

  createScreenSchedule: publicProcedure
    .input(createOrUpdateScreenScheduleSchema)
    .mutation(({ input }) => createScreenScheduleAction(input)),

  updateScreenSchedule: publicProcedure
    .input(
      z.object({
        value: createOrUpdateScreenScheduleSchema,
        id: z.string(),
      }),
    )
    .mutation(({ input }) => updateScreenScheduleAction(input)),

  deleteScreenSchedule: publicProcedure
    .input(z.string())
    .mutation(({ input }) => deleteScreenScheduleAction(input)),
});
