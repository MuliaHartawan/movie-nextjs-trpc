import { Base } from "./base.schema";

export type Snack = Base & {
    name: string;
    cost: number;
    expiryDate?: Date;
}