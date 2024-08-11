import { TMetaItem, TPaginationMeta, TPaginateRequest } from "@/types/meta";

const defaultPage = 1;
const defaultPerPage = 10;

export const countOffset = ({ page, perPage }: TPaginateRequest): number => {
  return (page - 1) * perPage;
};

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
