import { IndexQueryParamSchema } from "@/types/index-query-param";
import { z } from "zod";

export const IndexStudioSchema = IndexQueryParamSchema.extend({});

export type TIndexStudioQueryParam = z.infer<typeof IndexQueryParamSchema>;
