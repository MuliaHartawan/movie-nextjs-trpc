import { useActionMutation } from "@/libs/action-query";
import { useQueryClient } from "@tanstack/react-query";
import { message } from "antd";
import { useRouter } from "next/navigation";
import { createUserAction } from "../_actions/create-user";
import { updateUserAction } from "../_actions/update-user";

export const useUserAction = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const addUserMutation = useActionMutation(createUserAction, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Users"] });
      message.success("Berhasil menambahkan User");
      router.push("/dashboard/users");
    },
    onError: (error) => {
      message.error("Gagal menambahkan User");
      throw new Error("Gagal menambahkan User");
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
