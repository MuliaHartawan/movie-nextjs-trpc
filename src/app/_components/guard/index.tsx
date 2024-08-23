import { checkPermission } from "@/utils/permission";
import { useSession } from "next-auth/react";
import { FC, Fragment, PropsWithChildren } from "react";

export const Guard: FC<
  PropsWithChildren & { permissions: string[]; customCondition?: boolean }
> = async ({ permissions, customCondition, children }) => {
  const userPermissions = useSession()?.data?.user?.role?.permissions;
  const condition = checkPermission({
    userPermissions,
    permissions,
    customCondition,
  });
  return <Fragment>{condition ? children : null}</Fragment>;
};
