import { checkPermission } from "@/utils/permission";
import { useSession } from "next-auth/react";
import { useMemo } from "react";

export const Guard: React.FC<
  React.PropsWithChildren<{ permissions: string[]; customCondition?: boolean }>
> = ({ children, permissions, customCondition }) => {
  const userPermissions = useSession()?.data?.user?.role?.permissions;
  const permitted = useMemo(
    () =>
      checkPermission({
        userPermissions,
        permissions,
        customCondition,
      }),
    [userPermissions, permissions, customCondition],
  );
  return <>{permitted ? children : null}</>;
};
