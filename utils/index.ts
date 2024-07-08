import { TMetaItem, TMetaResponse } from "@/types/meta";

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
