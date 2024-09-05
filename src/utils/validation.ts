import { CustomException } from "@/types/cutom-exception";
import { FormInstance } from "antd";

export const formErrorHandling = <Values = any>(
  form: FormInstance<Values>,
  customException: CustomException,
) => {
  form.setFields(
    customException.errors?.map((value) => ({
      name: value.path[0],
      errors: [value.message],
    })) || [],
  );
};
