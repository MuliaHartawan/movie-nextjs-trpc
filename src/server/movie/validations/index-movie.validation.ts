import { IndexQueryParamSchema } from "@/types/index-query-param";
import { z } from "zod";

export const IndexMovieSchema = IndexQueryParamSchema.extend({});

export type TIndexMovieQueryParam = z.infer<typeof IndexQueryParamSchema>;
