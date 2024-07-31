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
    onSuccess: ({ success }) => {
      queryClient.invalidateQueries({ queryKey: ["snacks"] });
      message.success(success.message);
      router.push("/dashboard/snacks");
    },
    onError: (error: Error) => {
      message.error(error.message);
      throw new Error(error.message);
    },
  });

  const updateSnackMutation = useActionMutation(updateSnackAction, {
    onSuccess: ({ success }) => {
      queryClient.invalidateQueries({ queryKey: ["snacks"] });
      message.success(success.message);
      router.push("/dashboard/snacks");
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
