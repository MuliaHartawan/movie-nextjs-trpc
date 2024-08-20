import { useActionMutation } from "@/libs/action-query";
import { createRole, updateRole } from "@/server/role/actions/role.action";
import { useQueryClient } from "@tanstack/react-query";
import { message } from "antd";
import { useRouter } from "next/navigation";

export const useRoleAction = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const addRoleMutation = useActionMutation(createRole, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Roles"] });
      message.success("Berhasil menambahkan Role");
      router.push("/roles");
    },
    onError: (error: Error) => {
      message.error(error.message);
    },
  });

  const updateRoleMutation = useActionMutation(updateRole, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Roles"] });
      message.success("Berhasil memperbarui Role");
      router.push("/roles");
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
