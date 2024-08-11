// TODO: Need replace this in user & role index
export type TMetaItem = {
  page: number | 1;
  perPage: number | 10;
  totalPage?: number;
  search?: string;
  nextPage?: number | null;
  prevPage?: number | null;
};

export type TPaginateRequest = {
  perPage: number;
  page: number;
};

export type TPaginationMeta = {
  page: number | 1;
  perPage: number | 10;
  total: number;
  totalPage: number;
};

export type TPaginationResponse<T, M = TMetaItem> = {
  data: T;
  meta: M;
};
