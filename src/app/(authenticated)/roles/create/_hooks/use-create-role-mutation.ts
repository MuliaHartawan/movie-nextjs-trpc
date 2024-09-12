import { useActionMutation } from "@/libs/action-query";
import { createRole } from "@/server/role/actions/role.action";
import { CustomException } from "@/types/cutom-exception";
import { useQueryClient } from "@tanstack/react-query";
import { message } from "antd";
import { useRouter } from "next/navigation";

export const useCreateRoleMutation = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const addRoleMutation = useActionMutation(createRole, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Roles"] });
      message.success("Berhasil menambahkan Role");
      router.push("/roles");
    },
    onError: (error: CustomException) => {
      message.error(error.message);
    },
  });

  return addRoleMutation;
};
