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

export const serverCheckPermission = ({
  permissions,
  userPermissions,
}: TPermissionChecker): void => {
  if (!userPermissions) throw new Error("Forbidden");

  // Check if user has permission
  const hasPermission = hasCommonElements(permissions, userPermissions);
  if (!hasPermission) throw new Error("Forbidden");
};
