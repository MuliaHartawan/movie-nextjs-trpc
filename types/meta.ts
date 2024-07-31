export type TMetaItem = {
  code?: number;
  status?: string;
  message?: string;
  page: number | 1;
  perPage: number | 10;
  totalPage?: number;
  search?: string;
  nextPage?: number | null;
  prevPage?: number | null;
};

export type TMetaResponse<T, M = TMetaItem> = {
  data: T;
  meta: M;
};
