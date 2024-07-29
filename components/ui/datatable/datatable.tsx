import { FC, MouseEventHandler, ReactElement, useEffect, useState } from "react";
import { Button } from "../button";
import { TMetaItem } from "@/types/meta";
import { ChangeEventHandler, DetailedHTMLProps, HTMLAttributes } from "react";
import {
  useReactTable,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  ColumnDef,
} from "@tanstack/react-table";
import { parseAsInteger, useQueryState } from "nuqs";
import Link from "next/link";
import { Icon } from "@iconify/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export type TTable<T extends Record<string, any>> = DetailedHTMLProps<
  HTMLAttributes<HTMLTableElement>,
  HTMLTableElement
> & {
  meta?: TMetaItem;
  handleSearch?: ChangeEventHandler<HTMLInputElement>;
  createLink?: string;
  createLabel?: string;
  data: Array<T>;
  columns: ColumnDef<T>[];
  createAction?: MouseEventHandler<HTMLButtonElement>;
};

export type TPagination = {
  meta?: TMetaItem;
};

export const Pagination: FC<TPagination> = (props): ReactElement => {
  const { meta } = props;
  const [page, setPage] = useQueryState("page", parseAsInteger);
  const [perPage, setPerPage] = useQueryState("perPage", parseAsInteger);

  const totalPage = Number(meta?.totalPage) || 0;
  const currentPage = Number(meta?.page) || 1;
  const maxButtons = 5;
  const halfMaxButtons = Math.floor(maxButtons / 2);

  let startPage = Math.max(currentPage - halfMaxButtons, 1);
  let endPage = Math.min(startPage + maxButtons - 1, totalPage);

  if (endPage - startPage < maxButtons - 1) {
    startPage = Math.max(endPage - maxButtons + 1, 1);
  }

  return (
    <div className="flex justify-between">
      <div className="flex gap-x-2">
        <Button onClick={() => setPage(1)} variant="secondary">
          {"<<"}
        </Button>

        <Button onClick={() => Number(page) > 1 && setPage(Number(page) - 1)} variant="secondary">
          Prev
        </Button>

        {Array.from({ length: Math.min(maxButtons, totalPage) }, (_, i) => (
          <Button
            onClick={() => setPage(startPage + i)}
            key={startPage + i}
            variant={startPage + i === currentPage ? "primary" : "secondary"}
          >
            {startPage + i}
          </Button>
        ))}

        <Button
          onClick={() => Number(page) < Number(meta?.totalPage) && setPage(Number(page) + 1)}
          variant="secondary"
        >
          Next
        </Button>

        <Button onClick={() => setPage(Number(meta?.totalPage))} variant="secondary">
          {">>"}
        </Button>
      </div>
      <select
        className="w-20 h-10 bg-white border rounded-lg"
        onChange={(e) => setPerPage(Number(e.target.value))}
        value={perPage || 10}
        name="page"
      >
        <option value="10">10</option>
        <option value="25">25</option>
        <option value="50">50</option>
        <option value="100">100</option>
      </select>
    </div>
  );
};

export const Search: FC<TPagination> = (props): ReactElement => {
  const [search, setSearch] = useQueryState("search");

  return (
    <input
      className="w-full border rounded-lg p-2 outline-none"
      type="text"
      name="search"
      placeholder="Cari data..."
      onChange={(e) => setSearch(e?.target?.value)}
    />
  );
};

export const DataTable = <T extends Record<string, any>>(props: TTable<T>): ReactElement => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const table = useReactTable({
    data: props.data,
    columns: props.columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
    },
    onSortingChange: setSorting,
  });

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    replace(`${pathname}?${params.toString()}`);
  }, [pathname, replace, searchParams]);

  return (
    <section className="shadow-md bg-grey-50 h-fit overflow-y-hidden border p-4 rounded-lg w-full gap-y-4 flex flex-col overflow-x-auto">
      <div className="flex md:flex-row flex-col md:gap-x-3 gap-y-4 md:items-center sticky z-10 w-full">
        <div className="w-fit">
          <Search {...props} />
        </div>
        {props.createLink && (
          <div>
            <Link href={props.createLink}>
              <Button variant="primary">{props.createLabel}</Button>
            </Link>
          </div>
        )}

        {props.createAction && (
          <div>
            <Button onClick={props.createAction} variant="primary">
              {props.createLabel}
            </Button>
          </div>
        )}
      </div>
      <div className="overflow-x-auto min-w-max w-full h-fit flex  bg-white shadow-md rounded-b-lg relative">
        <table {...props} className="p-2 w-full table-auto border-collapse rounded-lg">
          <thead className="bg-green-600 p-2 w-auto h-auto rounded-lg">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th className="text-white py-2 px-4 text-left select-none" key={header.id}>
                    <div
                      {...{
                        className: "flex items-center",
                        onClick: header.column.getToggleSortingHandler(),
                      }}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.header, header.getContext())}

                      {{
                        asc: <Icon icon="carbon:caret-up" style={{ marginLeft: "2px" }} />,
                        desc: <Icon icon="carbon:caret-down" style={{ marginLeft: "2px" }} />,
                      }[header.column.getIsSorted() as string] ?? null}
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="divide-y">
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="even:bg-grey-100 odd:bg-grey-50">
                {row.getVisibleCells().map((cell, index) => (
                  <td key={index} className="p-4 text-grey-600 font-medium">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {props.meta && props?.data?.length > 0 && <Pagination {...props} />}
    </section>
  );
};
