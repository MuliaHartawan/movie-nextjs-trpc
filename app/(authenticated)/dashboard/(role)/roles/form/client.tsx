"use client";

import { Page } from "admiral";
import { Button, Col, Form, Input, Row, Select } from "antd";
import { useState } from "react";
import { useRoleAction } from "../../_hooks";
import { PERMISSIONS } from "@/common/enums/permissions.enum";
import { Role } from "@/libs/drizzle/schemas/role.schema";
import { TCreateOrUpdateRoleForm } from "../../_entities/schema";

const DashboardCreateRolesClient = ({ data, roleId }: { data: Role; roleId: string }) => {
  const { updateRoleMutation, addRoleMutation } = useRoleAction();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const handleAddOrUpdateRole = async (values: TCreateOrUpdateRoleForm) => {
    const { name, permissionIds } = values;
    setLoading(true);
    if (roleId) {
      await updateRoleMutation.mutateAsync({
        value: {
          name,
          permissionIds: permissionIds as [string, ...string[]],
        },
        id: roleId,
      });
      setLoading(false);
    } else {
      await addRoleMutation.mutateAsync({
        name,
        permissionIds: permissionIds as [string, ...string[]],
      });
      setLoading(false);
    }
    form.resetFields();
  };

  const permissionOptions = Object.values(PERMISSIONS).map((value) => ({
    value: value,
    label: value,
  }));

  return (
    <Page
      title={roleId ? "Edit Role" : "Add Role"}
      breadcrumbs={[
        {
          label: "Dashboard",
          path: "/dashboard",
        },
        {
          label: "Roles",
          path: "/dashboard/Roles",
        },
      ]}
    >
      <Row>
        <Col span={12} style={{ margin: "auto" }}>
          <Form form={form} onFinish={handleAddOrUpdateRole} layout="vertical">
            <Form.Item
              label="Name"
              name="name"
              rules={[{ required: true, message: "Nama wajib diisi" }]}
              initialValue={data?.name}
            >
              <Input placeholder="Admin" />
            </Form.Item>
            <Form.Item
              label="Permission"
              name="permissions"
              rules={[{ required: true, message: "Minimal satu permission harus dipilih" }]}
              initialValue={data}
            >
              <Select
                mode="multiple"
                placeholder="Select permissions"
                options={permissionOptions}
              />
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

export default DashboardCreateRolesClient;
