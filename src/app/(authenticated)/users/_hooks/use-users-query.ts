import { getUsersAction } from "@/server/user/actions/user.action";
import { TIndexUserQueryParam } from "@/server/user/validations/index-user.validation";
import { useQuery } from "@tanstack/react-query";

export const useUsersQuery = (parameter: TIndexUserQueryParam) => {
  return useQuery({
    queryKey: ["users", parameter],
    queryFn: () => getUsersAction(parameter),
  });
};
