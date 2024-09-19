import { getSnackAction } from "@/server/snack/actions/snack.action";
import { useQuery } from "@tanstack/react-query";

export const useSnackQuery = (id: string) => {
  return useQuery({
    queryKey: ["snack", id],
    queryFn: () => getSnackAction(id),
  });
};
