export type TStudio = {
  id: string;
  name: string;
  capacity: number;
  additionalFacilities: string | null;
};

export type TCreateOrUpdateStudioForm = {
  id: string;
  name: string;
  capacity: number;
  additionalFacilities: string[] | null;
};