"use client";
import { Button, Form, Input, Select } from "antd";
import { FC, useEffect } from "react";
import { FormProps } from "antd/lib";
import { CustomException } from "@/types/cutom-exception";
import { formErrorHandling } from "@/utils/validation";
import { PERMISSIONS } from "@/common/enums/permissions.enum";

type options = {
  permissions: Array<{ value: string; label: string }>;
};

type Props = {
  formProps: FormProps;
  loading: boolean;
  error: CustomException | null;
};

export const FormRole: FC<Props> = ({ formProps, loading, error }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (error) formErrorHandling(form, error);
  }, [error]);

  const permissionOptions = Object.values(PERMISSIONS).map((value) => ({
    value: value,
    label: value,
  }));

  return (
    <Form {...formProps} form={form} layout="vertical">
      <Form.Item label="Name" name="name" rules={[{ required: true, message: "Nama wajib diisi" }]}>
        <Input placeholder="Admin" />
      </Form.Item>
      <Form.Item
        label="Permission"
        name="permissions"
        rules={[{ required: true, message: "Minimal satu permission harus dipilih" }]}
      >
        <Select mode="multiple" placeholder="Select permissions" options={permissionOptions} />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" loading={loading}>
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};
