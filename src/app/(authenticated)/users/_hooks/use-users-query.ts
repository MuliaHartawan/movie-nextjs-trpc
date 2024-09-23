import { useActionQuery } from "@/libs/action-query";
import { getUsersAction } from "@/server/user/actions/user.action";

export const useUsersQuery = (...params: Parameters<typeof getUsersAction>) => {
  const query = useActionQuery(["users", ...params], getUsersAction, params);
  return query;
};
