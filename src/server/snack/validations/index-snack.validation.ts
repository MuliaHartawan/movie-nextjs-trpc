import { IndexQueryParamSchema } from "@/types/index-query-param";
import { z } from "zod";

export const IndexSnackSchema = IndexQueryParamSchema.extend({});

export type TIndexSnackQueryParam = z.infer<typeof IndexQueryParamSchema>;
