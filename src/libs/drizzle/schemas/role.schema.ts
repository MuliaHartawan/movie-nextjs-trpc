import { Base } from "./base.schema";
import { Permission } from "./permission.schema";

export type Role = Base & {
  name: string;
  rolePermissions?: {
    permission?: Permission | null;
  }[];
};
