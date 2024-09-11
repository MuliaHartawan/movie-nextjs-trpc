import { useActionMutation } from "@/libs/action-query";
import { updateRole } from "@/server/role/actions/role.action";
import { useQueryClient } from "@tanstack/react-query";
import { message } from "antd";
import { useRouter } from "next/navigation";

export const useUpdateRoleMutation = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const addRoleMutation = useActionMutation(updateRole, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Roles"] });
      message.success("Berhasil memperbarui Role");
      router.push("/roles");
    },
    onError: (error: Error) => {
      message.error(error.message);
    },
  });

  return addRoleMutation;
};
