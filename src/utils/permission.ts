import { auth } from "@/libs/auth/auth";
import ForbiddenException from "../errors/ForbiddenException";
import { hasCommonElements } from "./type";

type TPermissionChecker = {
  permissions: Array<string>;
  userPermissions?: Array<string>;
  customCondition?: boolean;
};

/**
 * Checks if the user has the required permissions and meets a custom condition.
 *
 * @param {Object} params - The parameters for the permission check.
 * @param {string[]} params.permissions - The required permissions.
 * @param {string[]} params.userPermissions - The user's permissions.
 * @param {boolean} [params.customCondition=true] - An optional custom condition that must also be met.
 * @returns {boolean} - Returns `true` if the user has the required permissions and meets the custom condition, otherwise `false`.
 *
 * @example
 * const permissions = ['read', 'write'];
 * const userPermissions = ['read', 'delete'];
 * const customCondition = true;
 * const hasAccess = checkPermission({ permissions, userPermissions, customCondition });
 * console.log(hasAccess); // Output: true
 */
export const checkPermission = ({
  permissions,
  userPermissions,
  customCondition = true,
}: TPermissionChecker): boolean => {
  if (!userPermissions) return false;
  const hasPermission = hasCommonElements(permissions, userPermissions);
  return hasPermission && customCondition;
};

/**
 * Checks if the current user has the required permissions on the server side.
 *
 * @param permissions - An array of permission strings that are required.
 * @returns Promise<void>: if the user has the required permissions.
 * @throws {ForbiddenException} - Throws an error if the user does not have the required permissions.
 *
 * @example
 * ```typescript
 * const permissions = ['read', 'write'];
 * await serverCheckPermission(permissions);
 * ```
 */
export const serverCheckPermission = async (permissions: Array<string>): Promise<void> => {
  const session = await auth();
  const userPermissions = session?.user?.role?.permissions;

  const hasPermission = checkPermission({ permissions, userPermissions });

  if (!hasPermission) throw new ForbiddenException("Tidak memiliki hak akses");
};
