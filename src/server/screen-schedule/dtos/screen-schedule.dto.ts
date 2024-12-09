import { ScreeningSchedule } from "@prisma/client";

export type ScreenScheduleDto = Omit<ScreeningSchedule, "id">;
