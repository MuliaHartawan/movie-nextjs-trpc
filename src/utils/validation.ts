import { CustomException } from "@/types/cutom-exception";
import { FormInstance } from "antd";
import { useEffect } from "react";

export const formErrorHandling = <Values = any>(
  form: FormInstance<Values>,
  customException: CustomException,
) => {
  form.setFields(
    customException.errors?.map((value) => ({
      name: value.path.join("."),
      errors: [value.message],
    })) || [],
  );
};

export const useFormErrorHandling = <Values = any>(
  form: FormInstance<Values>,
  error?: CustomException | null,
) => {
  useEffect(() => {
    if (error) formErrorHandling(form, error);
  }, [error, form]);
};
