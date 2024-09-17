import { getRolesAction } from "@/server/role/actions/role.action";
import { TIndexRoleQueryParam } from "@/server/role/validations/index-role.validation";
import { useQuery } from "@tanstack/react-query";

export const useRolesQuery = (parameter: TIndexRoleQueryParam) => {
  return useQuery({
    queryKey: ["roles", parameter],
    queryFn: () => getRolesAction(parameter),
  });
};

export const useRolesOptionQuery = (parameter: TIndexRoleQueryParam) => {
  return useQuery({
    queryKey: ["roles-option", parameter],
    queryFn: () => getRolesAction(parameter),
    select: (rolesQuery) => {
      return Array.isArray(rolesQuery.data)
        ? rolesQuery.data.map((value) => ({
            value: value.id!,
            label: value.name,
          }))
        : [];
    },
  });
};
