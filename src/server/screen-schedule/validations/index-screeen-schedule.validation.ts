import { IndexQueryParamSchema } from "@/types/index-query-param";
import { z } from "zod";

export const IndexScreenScheduleSchema = IndexQueryParamSchema.extend({});

export type TIndexScreenScheduleQueryParam = z.infer<typeof IndexQueryParamSchema>;
