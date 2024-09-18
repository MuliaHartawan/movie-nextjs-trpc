import { getSnacksAction } from "@/server/snack/actions/snack.action";
import { TIndexSnackQueryParam } from "@/server/snack/validations/index-snack.validation";
import { useQuery } from "@tanstack/react-query";

export const useSnacksQuery = (parameter: TIndexSnackQueryParam) => {
  return useQuery({
    queryKey: ["snacks", parameter],
    queryFn: () => getSnacksAction(parameter),
  });
};
