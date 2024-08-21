import { useActionMutation } from "@/libs/action-query";
import { useQueryClient } from "@tanstack/react-query";
import { message } from "antd";
import { useRouter } from "next/navigation";
import { createSnackAction, updateSnackAction } from "@/server/snack/actions/snack.action";

export const useSnackAction = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const addSnackMutation = useActionMutation(createSnackAction, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["snacks"] });
      message.success("Snack berhasil ditambahkan");
      router.push("/snacks");
    },
    onError: (error: Error) => {
      message.error(error.message);
      throw new Error(error.message);
    },
  });

  const updateSnackMutation = useActionMutation(updateSnackAction, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["snacks"] });
      message.success("Snack berhasil diubah");
      router.push("/snacks");
    },
    onError: (error: Error) => {
      message.error(error.message);
      throw new Error(error.message);
    },
  });

  return {
    addSnackMutation,
    updateSnackMutation,
  };
};
