import { useActionMutation } from "@/libs/action-query";
import { createRoleAction } from "@/server/role/actions/create-role";
import { updateRoleAction } from "@/server/role/actions/update-role";
import { useQueryClient } from "@tanstack/react-query";
import { message } from "antd";
import { useRouter } from "next/navigation";

export const useRoleAction = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const addRoleMutation = useActionMutation(createRoleAction, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Roles"] });
      message.success("Berhasil menambahkan Role");
      router.push("/dashboard/roles");
    },
    onError: (error: Error) => {
      message.error(error.message);
    },
  });

  const updateRoleMutation = useActionMutation(updateRoleAction, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Roles"] });
      message.success("Berhasil memperbarui Role");
      router.push("/dashboard/roles");
    },
    onError: (error: Error) => {
      message.error(error.message);
    },
  });

  return {
    addRoleMutation,
    updateRoleMutation,
  };
};
