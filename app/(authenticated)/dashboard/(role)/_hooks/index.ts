import { useActionMutation, useActionQuery } from "@/libs/action-query";
import { useQueryClient } from "react-query";
import { message } from "antd";
import { useRouter } from "next/navigation";
import { createRoleAction } from "../_actions/create-role";
import { updateRoleAction } from "../_actions/update-role";


export const useRoleAction = () => {
    const queryClient = useQueryClient();
    const router = useRouter();

    const addRoleMutation = useActionMutation(createRoleAction, {
        onSuccess: () => {
            queryClient.invalidateQueries("Roles");
            message.success("Berhasil menambahkan Role");
            router.push("/dashboard/roles");
        },
        onError: (error) => {
            message.error("Gagal menambahkan Role");
            throw new Error("Gagal menambahkan Role");
        }
    });

    const updateRoleMutation = useActionMutation(updateRoleAction, {
        onSuccess: () => {
            queryClient.invalidateQueries("Roles");
            message.success("Berhasil memperbarui Role");
            router.push("/dashboard/roles");
        },
        onError: (error) => {
            message.error("Gagal memperbarui Role");
            throw new Error("Gagal memperbarui Role");
        }
    });

    return {
        addRoleMutation,
        updateRoleMutation,
    };
};