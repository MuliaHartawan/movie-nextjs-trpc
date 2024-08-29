"use server";
import { NextPage } from "next";
import { ReactElement } from "react";
import { LoginFormComponent } from "../_components";

const AuthLoginPage: NextPage = async (): Promise<ReactElement> => {
  return <LoginFormComponent />;
};

export default AuthLoginPage;
