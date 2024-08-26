import { PERMISSIONS } from "@/common/enums/permissions.enum";
import { ROUTE } from "@/libs/constant/route";
import { TPaginationMeta, TPaginationResponse } from "@/types/meta";
import { TablePaginationConfig } from "antd";

export const metaResponsePrefix = <T>({
  data,
  meta,
}: {
  data: T;
  meta: TPaginationMeta;
}): TPaginationResponse<T> => {
  return {
    data,
    meta,
  };
};

export function calculateTotalPages(totalItems: number, itemsPerPage: number): number {
  return Math.ceil(totalItems / itemsPerPage);
}

export function hasCommonElements<T>(arr1: T[], arr2: T[]): boolean {
  const [shorter, longer] = arr1?.length < arr2?.length ? [arr1, arr2] : [arr2, arr1];
  const set = new Set<T>(shorter);
  return longer?.some((element) => set.has(element));
}

export const permissionMapper = [
  {
    url: ROUTE.DASHBOARD,
    permissions: [PERMISSIONS.DASHBOARD],
  },

  {
    url: ROUTE.SNACKS,
    permissions: [PERMISSIONS.SNACK_READ],
  },
  {
    url: ROUTE.SNACKS_FORM,
    permissions: [PERMISSIONS.SNACK_CREATE, PERMISSIONS.SNACK_UPDATE],
  },
  {
    url: ROUTE.SNACKS_DETAIL,
    permissions: [PERMISSIONS.SNACK_DETAIL],
  },

  {
    url: ROUTE.USERS,
    permissions: [PERMISSIONS.USER_READ],
  },
  {
    url: ROUTE.USERS_FORM,
    permissions: [PERMISSIONS.USER_CREATE, PERMISSIONS.USER_UPDATE],
  },
  {
    url: ROUTE.USERS_DETAIL,
    permissions: [PERMISSIONS.USER_DETAIL],
  },

  {
    url: ROUTE.ROLES,
    permissions: [PERMISSIONS.ROLE_READ],
  },
  {
    url: ROUTE.ROLES_FORM,
    permissions: [PERMISSIONS.ROLE_CREATE, PERMISSIONS.ROLE_UPDATE],
  },
  {
    url: ROUTE.ROLES_DETAIL,
    permissions: [PERMISSIONS.ROLE_DETAIL],
  },
];

export const paginationTransform = (t?: TPaginationMeta): TablePaginationConfig => {
  return {
    current: t?.page,
    pageSize: t?.perPage,
    total: t?.totalPage,
  };
};

export const makeSource = <T>(data?: TPaginationResponse<T>) => {
  return {
    data: data?.data,
    meta: paginationTransform(data?.meta),
  };
};
