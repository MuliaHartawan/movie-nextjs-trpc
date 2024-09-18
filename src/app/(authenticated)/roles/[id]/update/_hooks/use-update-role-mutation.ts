import { useActionMutation } from "@/libs/action-query";
import { updateRole } from "@/server/role/actions/role.action";
import { CustomException } from "@/types/cutom-exception";
import { useQueryClient } from "@tanstack/react-query";
import { message } from "antd";
import { useRouter } from "next/navigation";

export const useUpdateRoleMutation = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useActionMutation(updateRole, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["roles"] });
      message.success("Berhasil memperbarui Role");
      router.push("/roles");
    },
    onError: (error: CustomException) => {
      message.error(error.message);
    },
  });
};
