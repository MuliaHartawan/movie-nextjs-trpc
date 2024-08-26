import { IndexQueryParamSchema } from "@/types/index-query-param";
import { z } from "zod";

export const IndexRoleSchema = IndexQueryParamSchema.extend({});

export type TIndexRoleQueryParam = z.infer<typeof IndexQueryParamSchema>;
