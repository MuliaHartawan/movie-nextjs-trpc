import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import withQuery from "with-query";
import { IDataTableProps } from "admiral/table/datatable/type";
import { everyEqual, isObject } from "@/utils/type";
import dayjs from "dayjs";
import { DataTablePagination } from "admiral/table/datatable/type";

/**
 * Custom hook to manage and synchronize filter state with URL query parameters.
 *
 * @returns {Object} An object containing:
 * - `isNavigating`: A boolean indicating if navigation is in progress.
 * - `filter`: The current filter state as a record of key-value pairs.
 * - `setFilter`: A function to update the filter state and URL query parameters.
 * - `implementDataTable`: A function to handle changes from a data table component.
 *
 * @example
 * const { isNavigating, filter, setFilter, implementDataTable } = useFilter();
 *
 * console.log(filter);
 * // Output:
 * // {
 * //   page: "1",
 * //   per_page: "10",
 * //   sort_by: "name",
 * //   order: "asc",
 * //   name: "example",
 * //   date: "2023-10-01T00:00:00.000Z",
 * //   range: "2023-10-01;2023-10-10",
 * //   array: "1,2,3",
 * //   key: "value",
 * //   nullValue: undefined,
 * //   stringValue: "example"
 * // }
 *
 * // Implementation on Datatable component
 * <DataTable
 *  onChange={implementDataTable}
 *  search={filter.search}
 * ...
 * />
 *
 * // Update filter manually
 * setFilter({ name: "new value" });
 * // Output:
 * // {
 * //   ...,
 * //   name: "new value"
 * // }
 *
 *
 */
export const useFilter = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [filter, _setFilter] = useState<Record<string, TFilter>>(
    paramsToObject(searchParams.entries()) || {},
  );

  const [isNavigating, setIsNavigating] = useState(false);

  useEffect(() => {
    setIsNavigating(false);
    const values = paramsToObject(searchParams.entries());
    _setFilter(values);
  }, [pathname, searchParams]);

  const setFilter = async (
    data: Record<string, unknown>,
    cb?: (data: Record<string, TFilter>) => Record<string, TFilter>,
  ) => {
    let cloneData = normalize(data);

    // Set page to 1 after every filter except page, per_page, sort_by and order
    const isResetPage = !(
      "page" in cloneData ||
      "per_page" in cloneData ||
      "sory_by" in cloneData ||
      "order" in cloneData
    );
    if (isResetPage) {
      cloneData.page = "1";
    }

    if (cb) {
      cloneData = cb(cloneData);
    }

    const isEquals = everyEqual(cloneData, filter);
    if (isEquals) return;

    setIsNavigating(true);
    _setFilter((old) => ({ ...old, ...cloneData }));

    const pathnameWithQuery = withQuery(pathname, { ...filter, ...cloneData });
    router.replace(pathnameWithQuery, { scroll: false });
  };

  const implementDataTable: IDataTableProps<any, any>["onChange"] = (
    customFilter,
    sorter,
    filters,
    pagination,
    _extra,
  ) => {
    const cloneSort: Record<string, unknown> | undefined = structuredClone({
      ...sorter,
      column: {
        title: sorter?.column?.title,
        dataIndex: sorter?.column?.dataIndex,
        key: sorter?.column?.key,
        sorter: sorter?.column?.sorter,
      },
    });
    if (cloneSort?.sort) {
      cloneSort.sort_by = cloneSort.sort;
      delete cloneSort.sort;
    }
    setFilter({
      ...(customFilter || {}),
      ...(cloneSort || {}),
      ...(filters || {}),
      ...(normalizePagination(pagination) || {}),
    });
  };

  return {
    isNavigating,
    filter,
    setFilter,
    implementDataTable,
  };
};

export type TFilter = string | undefined;

/**
 * Converts an iterable of key-value pairs into an object.
 *
 * @param entries - An iterable iterator of key-value pairs where both key and value are strings.
 * @returns An object where each key-value pair from the iterable is assigned to the object.
 *
 * @example
 * const entries = new Map([["key1", "value1"], ["key2", "value2"]]).entries();
 * const result = paramsToObject(entries);
 * console.log(result); // { key1: "value1", key2: "value2" }
 */
function paramsToObject(entries: IterableIterator<[string, string]>) {
  const result: Record<string, TFilter> = {};
  // Forced assign type because weird error typescript
  for (let entry of entries as unknown as Array<[string, string]>) {
    const [key, value] = entry;
    result[key] = value;
  }
  return result;
}

/**
 * Normalizes pagination data by converting the keys to a consistent format.
 *
 * @param data - The pagination data to normalize.
 * @returns An object containing the normalized pagination data or undefined if no data is provided.
 *
 * @example
 * ```typescript
 * const paginationData = {
 *   page: 1,
 *   per_page: 10,
 *   total: 100,
 * };
 *
 * const normalizedData = normalizePagination(paginationData);
 * // normalizedData will be:
 * // {
 * //   page: 1,
 * //   perPage: 10,
 * //   total: 100,
 * // }
 * ```
 */
const normalizePagination = (data?: DataTablePagination) => {
  if (!data) return;
  return {
    page: data.page,
    perPage: data.per_page,
    total: data.total,
  };
};

/**
 * Normalizes the given data by flattening nested objects and converting values to appropriate string representations.
 *
 * @param data - Record with string keys and values of any type.
 * @returns A new record with string keys and values of type TFilter.
 *
 * @example
 * ```typescript
 * const data = {
 *   date: dayjs('2023-10-01'),
 *   range: [dayjs('2023-10-01'), dayjs('2023-10-10')],
 *   array: [1, 2, 3],
 *   nested: { key: 'value' },
 *   nullValue: null,
 *   undefinedValue: undefined,
 *   stringValue: 'example'
 * };
 *
 * const normalizedData = normalize(data);
 * console.log(normalizedData);
 * // Output:
 * // {
 * //   date: '2023-10-01T00:00:00.000Z',
 * //   range: '2023-10-01;2023-10-10',
 * //   array: '1,2,3',
 * //   key: 'value',
 * //   nullValue: undefined,
 * //   undefinedValue: undefined,
 * //   stringValue: 'example'
 * // }
 * ```
 */
const normalize = (data: Record<string, unknown>): Record<string, TFilter> => {
  // Flatting data
  const cloneData: Record<string, TFilter> = Object.keys(data).reduce(
    (all, key) => {
      // check if the value is object then flatting it
      const dataKey = data[key];

      if (dayjs.isDayjs(dataKey)) {
        // convert dayjs to iso string (output: 2023-10-01T00:00:00.000Z)
        all[key] = dataKey.toISOString();
      } else if (
        // convert date range to string (output: 2023-10-01;2023-10-10)
        Array.isArray(dataKey) &&
        dayjs.isDayjs(dataKey[0]) &&
        dayjs.isDayjs(dataKey[1]) &&
        dataKey.length === 2
      ) {
        const startDate = dataKey[0].format("YYYY-MM-DD");
        const endDate = dataKey[1].format("YYYY-MM-DD");
        all[key] = `${startDate};${endDate}`;
      } else if (Array.isArray(dataKey)) {
        // convert array to comma separated string (output: 1,2,3)
        all[key] = dataKey.join(",");
      } else if (dataKey === undefined || dataKey === null) {
        // convert null or undefined to undefined (output: undefined)
        all[key] = undefined;
      } else if (isObject(dataKey)) {
        // recursive flatting object
        const normalizedData = normalize(dataKey);
        Object.keys(normalizedData).forEach((valueKey) => {
          if (!all[valueKey]) all[valueKey] = normalizedData[valueKey];
        });
      } else {
        // other type convert to string
        all[key] = String(dataKey);
      }

      return all;
    },
    {} as Record<string, TFilter>,
  );
  return cloneData;
};
