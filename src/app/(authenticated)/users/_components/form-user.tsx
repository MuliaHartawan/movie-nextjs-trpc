"use client";

import { Button, Form, Input, Select } from "antd";
import { FC, useEffect } from "react";
import { FormProps } from "antd/lib";
import { CustomException } from "@/types/cutom-exception";
import { useRolesOptionQuery } from "../_hooks/use-roles-query";
import { useFormErrorHandling } from "@/hooks/form/use-form-error-handling";
import { usePaginateFilter } from "@/hooks/datatable/use-filter";

type Props = {
  formProps: FormProps;
  loading: boolean;
  error: CustomException | null;
};

export const FormUser: FC<Props> = ({ formProps, error, loading }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue(formProps.initialValues);
  }, [formProps.initialValues]);

  useFormErrorHandling(form, error);

  const paginateFilter = usePaginateFilter();

  const rolesOptionQuery = useRolesOptionQuery(paginateFilter);

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
        <Select
          placeholder="Select Role"
          options={rolesOptionQuery.data}
          loading={rolesOptionQuery.isLoading}
        />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" loading={loading}>
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};
