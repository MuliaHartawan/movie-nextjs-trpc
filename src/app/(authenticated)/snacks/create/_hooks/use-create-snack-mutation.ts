import { useActionMutation } from "@/libs/action-query";
import { useQueryClient } from "@tanstack/react-query";
import { message } from "antd";
import { useRouter } from "next/navigation";
import { createSnackAction } from "@/server/snack/actions/snack.action";
import { CustomException } from "@/types/cutom-exception";

export const useCreateSnackMutation = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useActionMutation(createSnackAction, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["snacks"] });
      message.success("Snack berhasil dibuat");
      router.push("/snacks");
    },
    onError: (error: CustomException) => {
      message.error(error.message);
      throw new Error(error.message);
    },
  });
};
