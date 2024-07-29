import { Base } from "./base.schema";

export type User = Base & {
  otp: string | null;
  fullname: string;
  email: string;
  address: string;
  password: string;
  image: string;
  emailVerified: Date;
  roleId?: string | null;
};
