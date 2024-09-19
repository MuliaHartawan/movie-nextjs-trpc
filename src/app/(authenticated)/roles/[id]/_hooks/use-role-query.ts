import { getRoleAction } from "@/server/role/actions/role.action";
import { useQuery } from "@tanstack/react-query";

export const useRoleQuery = (id: string) => {
  return useQuery({
    queryKey: ["role", id],
    queryFn: () => getRoleAction(id),
  });
};
