import { PERMISSIONS } from "@/common/enums/permissions.enum";
import { serverCheckPermission } from "@/utils/permission";
import { validate } from "@/utils/zod-validate";
import {
  createStudioAndGenres,
  deleteStudioById,
  findStudio,
  findOneStudioById,
  updateStudioAndGenres,
} from "../repositories/studio.repository";
import {
  createOrUpdateStudioSchema,
  TCreateOrUpdateStudioValidation,
} from "../validations/create-or-update-studio.validation";
import { TIndexStudioQueryParam } from "../validations/index-studio.validation";
import NotFoundException from "../../../errors/NotFoundException";

export const getStudiosAction = async (queryParam: TIndexStudioQueryParam) => {
  return await findStudio(queryParam);
};

export const getStudioAction = async (id: string) => {
  // Permission authorization
  await serverCheckPermission([PERMISSIONS.STUDIO_DETAIL]);

  return await findOneStudioById(id);
};

export const createStudioAction = async (value: TCreateOrUpdateStudioValidation) => {
  // Permission authorization
  await serverCheckPermission([PERMISSIONS.STUDIO_CREATE]);

  // Validation
  await validate(createOrUpdateStudioSchema, value);

  await createStudioAndGenres({
    name: value.name,
    capacity: value.capacity,
    additionalFacilities: value.additionalFacilities ?? null,
  });
};

export const updateStudioAction = async ({
  value,
  id,
}: {
  value: TCreateOrUpdateStudioValidation;
  id: string;
}) => {
  // Permission authorization
  await serverCheckPermission([PERMISSIONS.STUDIO_UPDATE]);

  // Validation
  await validate(createOrUpdateStudioSchema, value);

  const studio = await findOneStudioById(id);
  if (!studio) {
    throw new NotFoundException("Sudio tidak ditemukan!");
  }

  await updateStudioAndGenres(id, {
    name: value.name,
    capacity: value.capacity,
    additionalFacilities: value.additionalFacilities ?? null,
  });
};

export const deleteStudioAction = async (id: string) => {
  // Permission authorization
  await serverCheckPermission([PERMISSIONS.STUDIO_DELETE]);

  const studio = await findOneStudioById(id);
  if (!studio) {
    throw new NotFoundException("Sudio tidak ditemukan!");
  }

  await deleteStudioById(id);
};
