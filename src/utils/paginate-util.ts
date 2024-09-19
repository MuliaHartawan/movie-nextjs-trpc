import { TPaginationMeta, TPaginateRequest } from "@/types/meta";
import { PageNumberCounters, PageNumberPagination } from "prisma-extension-pagination/dist/types";

const defaultPage = 1;
const defaultPerPage = 10;

export const countOffset = ({ page, perPage }: TPaginateRequest): number => {
  return (page - 1) * perPage;
};

// TODO: @depricated
export const mapMeta = (count: number, { page, perPage }: TPaginateRequest): TPaginationMeta => {
  page = page || defaultPage;
  perPage = perPage || defaultPerPage;

  return {
    page,
    perPage,
    total: count,
    totalPage: Math.ceil(count / perPage),
  };
};

export const convertPaginationMeta = (
  meta: PageNumberPagination & PageNumberCounters,
  queryParam: TPaginateRequest,
): TPaginationMeta => {
  return {
    page: meta.currentPage,
    perPage: queryParam.perPage,
    total: meta.totalCount,
    totalPage: Math.ceil(meta.totalCount / queryParam.perPage),
  };
};
