import { Base } from "./base.schema";

export type User = Base & {
  fullname: string;
  address: string;
  password: string;
  email: string;
  roleId: string | null;
  id: string;
  otp: string | null;
  image: string | null;
};
