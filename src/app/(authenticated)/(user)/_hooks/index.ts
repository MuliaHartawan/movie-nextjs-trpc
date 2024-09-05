import { useActionMutation } from "@/libs/action-query";
import { createUserAction, updateUserAction } from "@/server/user/actions/user.action";
import { CustomException } from "@/types/cutom-exception";
import { formErrorHandling } from "@/utils/validation";
import { useQueryClient } from "@tanstack/react-query";
import { message } from "antd";
import { FormInstance } from "antd/lib";
import { useRouter } from "next/navigation";

export const useUserAction = ({ form }: { form?: FormInstance }) => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const addUserMutation = useActionMutation(createUserAction, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Users"] });
      message.success("Berhasil menambahkan User");
      router.push("/users");
    },
    onError: (error: Error) => {
      message.error(error.message);
      if (form) formErrorHandling(form, error as CustomException);
    },
  });

  const updateUserMutation = useActionMutation(updateUserAction, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Users"] });
      message.success("Berhasil memperbarui User");
      router.push("/users");
    },
    onError: (error: Error) => {
      message.error(error.message);
      if (form) formErrorHandling(form, error as CustomException);
    },
  });

  return {
    addUserMutation,
    updateUserMutation,
  };
};
