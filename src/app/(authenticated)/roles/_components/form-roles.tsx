"use client";
import { Button, Form, Input, Select } from "antd";
import { FC } from "react";
import { FormProps } from "antd/lib";

type options = {
  permissions: Array<{ value: string; label: string }>;
};

type Props = {
  formProps: FormProps;
  options: options;
  loading: boolean;
};

export const FormRoles: FC<Props> = ({ formProps, options, loading }) => {
  const [form] = Form.useForm();

  return (
    <Form {...formProps} disabled={loading} form={form} layout="vertical">
      <Form.Item label="Name" name="name" rules={[{ required: true, message: "Nama wajib diisi" }]}>
        <Input placeholder="Admin" />
      </Form.Item>
      <Form.Item
        label="Permission"
        name="permissions"
        rules={[{ required: true, message: "Minimal satu permission harus dipilih" }]}
      >
        <Select mode="multiple" placeholder="Select permissions" options={options.permissions} />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" loading={loading}>
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};
