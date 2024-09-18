import { getUser } from "@/server/user/actions/user.action";
import { useQuery } from "@tanstack/react-query";

export const useUserQuery = (from: string) => {
  return useQuery({
    queryKey: ["user", from],
    queryFn: () => getUser(from),
  });
};
