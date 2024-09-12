import { getRolesAction } from "@/server/role/actions/role.action";
import { TIndexRoleQueryParam } from "@/server/role/validations/index-role.validation";
import { useQuery } from "@tanstack/react-query";

export const useRolesQuery = (parameter: TIndexRoleQueryParam) => {
  return useQuery({
    queryKey: ["Roles", parameter],
    queryFn: () => getRolesAction(parameter),
  });
};
