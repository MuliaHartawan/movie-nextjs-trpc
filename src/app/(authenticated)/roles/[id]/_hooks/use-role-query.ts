import { getRoleAction } from "@/server/role/actions/role.action";
import { useQuery } from "@tanstack/react-query";

export const useRoleQuery = (from: string) => {
  return useQuery({
    queryKey: ["Roles", from],
    queryFn: () => getRoleAction(from),
  });
};
