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
import { TIndexScreenScheduleQueryParam } from "../validations/index-screeen-schedule.validation";
import NotFoundException from "../../../errors/NotFoundException";

export const getScreenSchedulesAction = async (queryParam: TIndexScreenScheduleQueryParam) => {
  return await findScreenSchedule(queryParam);
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
    screeningTime: new Date(value.screeningTime),
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

  const screenSchedule = await findOneScreenScheduleById(id);
  if (!screenSchedule) {
    throw new NotFoundException("Screen schedule tidak ditemukan!");
  }

  await updateScreenScheduleAndGenres(id, {
    screeningTime: new Date(value.screeningTime),
    price: value.price,
    movieId: value.movieId,
    studioId: value.studioId,
  });
};

export const deleteScreenScheduleAction = async (id: string) => {
  // Permission authorization
  await serverCheckPermission([PERMISSIONS.SCREEN_SCHEDULE_DELETE]);

  const screenSchedule = await findOneScreenScheduleById(id);
  if (!screenSchedule) {
    throw new NotFoundException("Screen schedule tidak ditemukan!");
  }

  await deleteScreenScheduleById(id);
};
