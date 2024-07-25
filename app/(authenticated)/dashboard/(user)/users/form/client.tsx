"use client";

import { Page } from "admiral";
import { Button, Col, Form, Input, Row, Select } from "antd";
import { useState } from "react";
import { useUserAction } from "../../_hooks";
import { User } from "../../_actions/get-users";
import { TCreateOrUpdateUserForm } from "../../_entities/schema";
import { Role } from "@/libs/drizzle/schemas/role.schema";

const DashboardCreateUsersClient = ({
  data,
  userId,
  roles,
}: {
  data: User;
  userId: string;
  roles?: Role[];
}) => {
  const { updateUserMutation, addUserMutation } = useUserAction();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const handleAddOrUpdateUser = async (values: TCreateOrUpdateUserForm) => {
    setLoading(true);
    try {
      if (userId) {
        await updateUserMutation.mutateAsync({
          value: values,
          id: userId,
        });
        setLoading(false);
      } else {
        console.log(values);
        await addUserMutation.mutateAsync(values);
        setLoading(false);
      }
      form.resetFields();
    } catch (error) {
      console.log(error);
    }
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
          path: "/dashboard/Users",
        },
      ]}
    >
      <Row>
        <Col span={12} style={{ margin: "auto" }}>
          <Form form={form} onFinish={handleAddOrUpdateUser} layout="vertical">
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
              <Button type="primary" htmlType="submit" loading={loading}>
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </Page>
  );
};

export default DashboardCreateUsersClient;