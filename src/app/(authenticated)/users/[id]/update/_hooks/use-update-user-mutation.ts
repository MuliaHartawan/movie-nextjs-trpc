import { useActionMutation } from "@/libs/action-query";
import { updateUserAction } from "@/server/user/actions/user.action";
import { CustomException } from "@/types/cutom-exception";
import { useQueryClient } from "@tanstack/react-query";
import { message } from "antd";
import { useRouter } from "next/navigation";

export const useUpdateUserMutation = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useActionMutation(updateUserAction, {
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      message.success("Berhasil menambahkan User");
      router.push("/users");
      return data;
    },
    onError: (error: CustomException) => {
      message.error(error.message);
      throw error;
    },
  });
};
