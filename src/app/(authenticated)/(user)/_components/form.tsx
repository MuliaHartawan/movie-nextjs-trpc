"use client";

import { Page } from "admiral";
import { Button, Col, Form, Input, Row, Select } from "antd";
import { FC, ReactElement } from "react";
import { useUserAction } from "../_hooks";
import { Role } from "@/libs/drizzle/schemas/role.schema";
import { TCreateOrUpdateUserValidation } from "@/server/user/validations/create-or-update.validation";
import { User } from "@prisma/client";

export const DashboardCreateUsersModule: FC<{
  data?: User;
  userId: string;
  roles?: Role[];
}> = ({ data, userId, roles }): ReactElement => {
  const [form] = Form.useForm();

  const { updateUserMutation, addUserMutation } = useUserAction({ form });

  const handleAdd = (values: TCreateOrUpdateUserValidation) => {
    addUserMutation.mutateAsync(values);
  };

  const handleUpdate = (values: TCreateOrUpdateUserValidation) => {
    updateUserMutation.mutateAsync({
      value: values,
      id: userId,
    });
  };

  const roleOptions = Array.isArray(roles)
    ? roles.map((value) => ({
        value: value.id,
        label: value.name,
      }))
    : [];

  return (
    <Page
      title={userId ? "Edit User" : "Add User"}
      breadcrumbs={[
        {
          label: "Dashboard",
          path: "/dashboard",
        },
        {
          label: "Users",
          path: "/Users",
        },
      ]}
    >
      <Row>
        <Col span={12} style={{ margin: "auto" }}>
          <Form form={form} onFinish={userId ? handleUpdate : handleAdd} layout="vertical">
            <Form.Item
              label="Full Name"
              name="fullname"
              rules={[{ required: true, message: "Nama wajib diisi" }]}
              initialValue={data?.fullname}
            >
              <Input placeholder="Admin" />
            </Form.Item>
            <Form.Item label="Password" name="password" initialValue={data?.password}>
              <Input type="password" placeholder="Tulis password anda" />
            </Form.Item>
            <Form.Item label="email" name="email" initialValue={data?.email}>
              <Input type="email" placeholder="johndoe@gmail.com" />
            </Form.Item>
            <Form.Item label="Address" name="address" initialValue={data?.address}>
              <Input placeholder="Jalan No.7 Malang" />
            </Form.Item>
            <Form.Item label="Role" name="roleId" initialValue={data?.roleId}>
              <Select placeholder="Select Role" options={roleOptions} />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                loading={addUserMutation.isPending || updateUserMutation.isPending}
              >
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </Page>
  );
};
