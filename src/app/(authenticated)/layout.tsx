import { FC, PropsWithChildren, ReactElement } from "react";
import { MainLayout } from "@/components/ui/layout";
import { auth } from "@/libs/auth/auth";

const AuthenticatedTemplate: FC<Readonly<PropsWithChildren>> = async (
  props,
): Promise<ReactElement> => {
  const session = await auth();
  return <MainLayout session={session}>{props.children}</MainLayout>;
};

export default AuthenticatedTemplate;
