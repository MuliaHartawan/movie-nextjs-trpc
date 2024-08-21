type TPermissionChecker = {
  permissions: Array<string>;
  userPermissions: Array<string>;
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
  customCondition = false,
}: TPermissionChecker): boolean => {
  const hasPermission = hasCommonElements(permissions, userPermissions);

  if (customCondition) {
    return hasPermission && customCondition;
  }

  return hasPermission;
};
