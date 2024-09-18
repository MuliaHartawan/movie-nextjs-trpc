import { CustomException } from "@/types/cutom-exception";
import { formErrorHandling } from "@/utils/form";
import { FormInstance } from "antd";
import { useEffect } from "react";

export const useFormErrorHandling = <Values = any>(
  form: FormInstance<Values>,
  error?: CustomException | null,
) => {
  useEffect(() => {
    if (error) formErrorHandling(form, error);
  }, [error, form]);
};
