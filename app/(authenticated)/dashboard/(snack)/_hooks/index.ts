import { useActionMutation } from "@/libs/action-query";
import { useQueryClient } from "@tanstack/react-query";
import { createSnackAction } from "../_actions/create-snack";
import { message } from "antd";
import { useRouter } from "next/navigation";
import { updateSnackAction } from "../_actions/update-snack";

export const useSnackAction = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const addSnackMutation = useActionMutation(createSnackAction, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["snacks"] });
      message.success("Berhasil menambahkan snack");
      router.push("/dashboard/snacks");
    },
    onError: (error) => {
      message.error("Gagal menambahkan snack");
      throw new Error("Gagal menambahkan snack");
    },
  });

  const updateSnackMutation = useActionMutation(updateSnackAction, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["snacks"] });
      message.success("Berhasil memperbarui snack");
      router.push("/dashboard/snacks");
    },
    onError: (error) => {
      message.error("Gagal memperbarui snack");
      throw new Error("Gagal memperbarui snack");
    },
  });

  return {
    addSnackMutation,
    updateSnackMutation,
  };
};
