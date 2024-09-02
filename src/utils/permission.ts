import { auth } from "@/libs/auth/auth";
import ForbiddenException from "../errors/ForbiddenException";

type TPermissionChecker = {
  permissions: Array<string>;
  userPermissions?: Array<string>;
  customCondition?: boolean;
};

export function hasCommonElements<T>(arr1: T[], arr2: T[]): boolean {
  const [shorter, longer] = arr1?.length < arr2?.length ? [arr1, arr2] : [arr2, arr1];
  const set = new Set<T>(shorter);
  return longer?.some((element) => set.has(element));
}

export const checkPermission = ({
  permissions,
  userPermissions,
  customCondition = true,
}: TPermissionChecker): boolean => {
  if (!userPermissions) return false;
  const hasPermission = hasCommonElements(permissions, userPermissions);
  return hasPermission && customCondition;
};

export const serverCheckPermission = async (permissions: Array<string>): Promise<void> => {
  const session = await auth();
  const userPermissions = session?.user?.role?.permissions;

  const hasPermission = checkPermission({ permissions, userPermissions });

  if (!hasPermission) throw new ForbiddenException("Tidak memiliki hak akses");
};
