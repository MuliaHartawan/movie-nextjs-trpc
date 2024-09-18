import { useRouter } from "next/navigation";
import { loginByCredentials } from "../_actions/login-action";
import { useActionMutation } from "@/libs/action-query";
import { message } from "antd";

export const useLoginByCredentialsMutation = () => {
  const router = useRouter();

  return useActionMutation(loginByCredentials, {
    onSuccess: () => {
      message.success("Login berhasil");
      router.push("/dashboard");
    },
    onError: (error: Error) => {
      message.error(error.message.split(".")[0]);
    },
  });
};
