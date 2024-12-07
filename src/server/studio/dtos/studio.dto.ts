import { Studio } from "@prisma/client";

export type StudioDto = Pick<Studio, "name" | "capacity" | "additionalFacilities">;
