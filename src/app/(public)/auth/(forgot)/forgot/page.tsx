"use server";
import { NextPage } from "next";
import { ReactElement } from "react";
import { ForgotFormModule } from "../_components";

const AuthForgotPage: NextPage = async (): Promise<ReactElement> => {
  return <ForgotFormModule />;
};

export default AuthForgotPage;
