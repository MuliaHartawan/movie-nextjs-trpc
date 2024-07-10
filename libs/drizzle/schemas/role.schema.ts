import { Base } from "./base.schema";

export type Role = Base & {
    name: string;
    permissions: string[];
};