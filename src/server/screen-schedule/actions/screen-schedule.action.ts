import { PERMISSIONS } from "@/common/enums/permissions.enum";
import { serverCheckPermission } from "@/utils/permission";
import { validate } from "@/utils/zod-validate";
import {
  createScreenScheduleAndGenres,
  deleteScreenScheduleById,
  findScreenSchedule,
  findOneScreenScheduleById,
  updateScreenScheduleAndGenres,
} from "../repositories/screen-schedule.repository";
import {
  createOrUpdateScreenScheduleSchema,
  TCreateOrUpdateScreenScheduleValidation,
} from "../validations/create-or-update-screen-schedule.validation";

export const getScreenSchedulesAction = async () => {
  return await findScreenSchedule();
};

export const getScreenScheduleAction = async (id: string) => {
  // Permission authorization
  await serverCheckPermission([PERMISSIONS.SCREEN_SCHEDULE_DETAIL]);

  return await findOneScreenScheduleById(id);
};

export const createScreenScheduleAction = async (
  value: TCreateOrUpdateScreenScheduleValidation,
) => {
  // Permission authorization
  await serverCheckPermission([PERMISSIONS.SCREEN_SCHEDULE_CREATE]);

  // Validation
  await validate(createOrUpdateScreenScheduleSchema, value);

  await createScreenScheduleAndGenres({
    screeningTime: value.screeningTime,
    price: value.price,
    movieId: value.movieId,
    studioId: value.studioId,
  });
};

export const updateScreenScheduleAction = async ({
  value,
  id,
}: {
  value: TCreateOrUpdateScreenScheduleValidation;
  id: string;
}) => {
  // Permission authorization
  await serverCheckPermission([PERMISSIONS.SCREEN_SCHEDULE_UPDATE]);

  // Validation
  await validate(createOrUpdateScreenScheduleSchema, value);

  await updateScreenScheduleAndGenres(id, {
    screeningTime: value.screeningTime,
    price: value.price,
    movieId: value.movieId,
    studioId: value.studioId,
  });
};

export const deleteScreenScheduleAction = async (id: string) => {
  // Permission authorization
  await serverCheckPermission([PERMISSIONS.SCREEN_SCHEDULE_DELETE]);

  await deleteScreenScheduleById(id);
};
