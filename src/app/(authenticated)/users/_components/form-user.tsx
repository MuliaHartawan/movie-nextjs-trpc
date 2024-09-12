"use client";

import { Button, Form, Input, Select } from "antd";
import { FC, useEffect } from "react";
import { FormProps } from "antd/lib";
import { CustomException } from "@/types/cutom-exception";
import { formErrorHandling } from "@/utils/validation";
import { useRolesQuery } from "../_hooks/use-roles-query";
import { useSearchParams } from "next/navigation";

type Props = {
  formProps: FormProps;
  loading: boolean;
  error: CustomException | null;
};

export const FormUser: FC<Props> = ({ formProps, error, loading }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (error) formErrorHandling(form, error);
  }, [error]);

  const searchParams = useSearchParams();

  const rolesQuery = useRolesQuery({
    page: Number(searchParams.get("page") || 1),
    perPage: Number(searchParams.get("perPage") || 10),
    search: String(searchParams.get("search") || ""),
  });

  const roleOptions = Array.isArray(rolesQuery.data?.data)
    ? rolesQuery.data?.data.map((value) => ({
        value: value.id!,
        label: value.name,
      }))
    : [];

  return (
    <Form {...formProps} form={form} layout="vertical">
      <Form.Item
        label="Full Name"
        name="fullname"
        rules={[{ required: true, message: "Nama wajib diisi" }]}
      >
        <Input placeholder="Admin" />
      </Form.Item>
      <Form.Item label="Password" name="password">
        <Input type="password" placeholder="Tulis password anda" />
      </Form.Item>
      <Form.Item label="email" name="email">
        <Input type="email" placeholder="johndoe@gmail.com" />
      </Form.Item>
      <Form.Item label="Address" name="address">
        <Input placeholder="Jalan No.7 Malang" />
      </Form.Item>
      <Form.Item label="Role" name="roleId">
        <Select placeholder="Select Role" options={roleOptions} loading={rolesQuery.isLoading} />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" loading={loading}>
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};
