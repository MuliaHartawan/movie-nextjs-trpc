import { PERMISSIONS } from "@/common/enums/permissions.enum";
import { TMetaItem, TPaginationResponse } from "@/types/meta";
import { TablePaginationConfig } from "antd";

export const metaResponsePrefix = <T>({
  data,
  meta,
}: {
  data: T;
  meta: TMetaItem;
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
    url: "/dashboard",
    permissions: [PERMISSIONS.DASHBOARD],
  },

  {
    url: "/dashboard/snacks",
    permissions: [PERMISSIONS.SNACK_READ],
  },
  {
    url: "/dashboard/snacks/form",
    permissions: [PERMISSIONS.SNACK_CREATE, PERMISSIONS.SNACK_UPDATE],
  },
  {
    url: "/dashboard/snacks/detail",
    permissions: [PERMISSIONS.SNACK_DETAIL],
  },

  {
    url: "/dashboard/users",
    permissions: [PERMISSIONS.USER_READ],
  },
  {
    url: "/dashboard/users/form",
    permissions: [PERMISSIONS.USER_CREATE, PERMISSIONS.USER_UPDATE],
  },
  {
    url: "/dashboard/users/detail",
    permissions: [PERMISSIONS.USER_DETAIL],
  },

  {
    url: "/dashboard/roles",
    permissions: [PERMISSIONS.ROLE_READ],
  },
  {
    url: "/dashboard/roles/form",
    permissions: [PERMISSIONS.ROLE_CREATE, PERMISSIONS.ROLE_UPDATE],
  },
  {
    url: "/dashboard/roles/detail",
    permissions: [PERMISSIONS.ROLE_DETAIL],
  },
];

export const paginationTransform = (t?: TMetaItem): TablePaginationConfig => {
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
