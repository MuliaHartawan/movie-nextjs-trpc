import { IndexQueryParamSchema } from "@/types/index-query-param";
import { z } from "zod";

export const IndexUserSchema = IndexQueryParamSchema.extend({});

export type TIndexUserQueryParam = z.infer<typeof IndexQueryParamSchema>;
