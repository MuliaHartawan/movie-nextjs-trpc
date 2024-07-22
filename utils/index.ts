import { TMetaItem, TMetaResponse } from "@/types/meta";
import { TablePaginationConfig } from "antd";

export const metaResponsePrefix = <T>({
  data,
  meta,
}: {
  data: T;
  meta: TMetaItem;
}): TMetaResponse<T> => {
  return {
    data,
    meta,
  };
};

export function calculateTotalPages(totalItems: number, itemsPerPage: number): number {
  return Math.ceil(totalItems / itemsPerPage);
}

export const paginationTransform = (t: TMetaItem): TablePaginationConfig => {
  return {
    current: t.page,
    pageSize: t.perPage,
    total: t.totalPage,
  };
};

export const makeSource = <T>(data: TMetaResponse<T>) => {
  return {
    data: data.data,
    meta: paginationTransform(data.meta),
  };
};
