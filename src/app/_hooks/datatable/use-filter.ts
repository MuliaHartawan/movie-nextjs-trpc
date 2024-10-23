import { useRouter, useSearchParams } from "next/navigation";
import { useTableFilter, UseTableFilterProps } from "admiral/table/datatable/hook";

export const useFilter = (options?: UseTableFilterProps["options"]) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  return useTableFilter({
    searchParams,
    cb: (searchParamsStr) => {
      router.replace(
        process.env.NEXT_PUBLIC_APP_URL + searchParamsStr ? "?" + searchParamsStr : "",
        {
          scroll: false,
        },
      );
    },
    options,
  });
};
