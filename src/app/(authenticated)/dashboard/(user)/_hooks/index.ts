import { useActionMutation } from "@/libs/action-query";
import { useQueryClient } from "@tanstack/react-query";
import { message } from "antd";
import { useRouter } from "next/navigation";
import { createUserAction, updateUserAction } from "../_server-actions/user.action";

export const useUserAction = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const addUserMutation = useActionMutation(createUserAction, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Users"] });
      message.success("Berhasil menambahkan User");
      router.push("/dashboard/users");
    },
    onError: (error: Error) => {
      message.error(error.message);
      throw new Error(error.message);
    },
  });

  const updateUserMutation = useActionMutation(updateUserAction, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Users"] });
      message.success("Berhasil memperbarui User");
      router.push("/dashboard/users");
    },
    onError: (error) => {
      message.error("Gagal memperbarui User");
      throw new Error("Gagal memperbarui User");
    },
  });

  return {
    addUserMutation,
    updateUserMutation,
  };
};
