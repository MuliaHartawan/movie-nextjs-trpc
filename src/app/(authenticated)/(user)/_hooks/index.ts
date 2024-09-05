import { useActionMutation } from "@/libs/action-query";
import { createUserAction, updateUserAction } from "@/server/user/actions/user.action";
import { useQueryClient } from "@tanstack/react-query";
import { message } from "antd";
import { useRouter } from "next/navigation";

export const useUserAction = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const addUserMutation = useActionMutation(createUserAction, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Users"] });
      message.success("Berhasil menambahkan User");
      router.push("/users");
    },
    onError: (error: Error) => {
      console.log(error);
      message.error(error.message);
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
    },
  });

  return {
    addUserMutation,
    updateUserMutation,
  };
};
