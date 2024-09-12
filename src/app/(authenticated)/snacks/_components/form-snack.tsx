"use client";

import { Button, DatePicker, Form, Input } from "antd";
import { FC, ReactElement, useEffect } from "react";
import { FormProps } from "antd/lib";
import { CustomException } from "@/types/cutom-exception";
import { formErrorHandling } from "@/utils/validation";

type Props = {
  formProps: FormProps;
  loading: boolean;
  error: CustomException | null;
};

export const FormSnack: FC<Props> = ({ formProps, error, loading }): ReactElement => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (error) formErrorHandling(form, error);
  }, [error]);

  return (
    <Form {...formProps} form={form} layout="vertical">
      <Form.Item label="Name" name="name">
        <Input placeholder="John Doe" />
      </Form.Item>
      <Form.Item label="Cost" name="cost">
        <Input placeholder="3000" />
      </Form.Item>
      <Form.Item label="Expiry Date" name="expiryDate">
        <DatePicker style={{ width: "100%" }} />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" loading={loading}>
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};
