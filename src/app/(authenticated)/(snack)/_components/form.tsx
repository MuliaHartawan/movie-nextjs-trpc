"use client";

import { Page } from "admiral";
import { Button, Col, DatePicker, Form, Input, Row } from "antd";
import { useSnackAction } from "../_hooks";
import dayjs from "dayjs";
import { FC, ReactElement, useState } from "react";
import { Snack } from "@prisma/client";

export const DashboardCreateSnacksModule: FC<{
  data?: Snack;
  snackId?: string;
}> = ({ data, snackId }): ReactElement => {
  const { updateSnackMutation, addSnackMutation } = useSnackAction();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const handleAddProduct = async (values: Snack) => {
    setLoading(true);
    if (snackId) {
      await updateSnackMutation.mutateAsync({
        value: {
          name: values.name,
          price: +values.price,
          expiredAt: dayjs(values.expiredAt).format("YYYY-MM-DD"),
        },
        id: snackId,
      });
      setLoading(false);
    } else {
      await addSnackMutation.mutateAsync({
        name: values.name,
        price: +values.price,
        expiredAt: dayjs(values.expiredAt).format("YYYY-MM-DD"),
      });
      setLoading(false);
    }
    form.resetFields();
  };

  return (
    <Page
      title={snackId ? "Edit Snack" : "Add Snack"}
      breadcrumbs={[
        {
          label: "Dashboard",
          path: "/dashboard",
        },
        {
          label: "Snacks",
          path: "/snacks",
        },
      ]}
    >
      <Row>
        <Col span={12} style={{ margin: "auto" }}>
          <Form form={form} onFinish={handleAddProduct} layout="vertical">
            <Form.Item label="Name" name="name" initialValue={data?.name}>
              <Input placeholder="John Doe" />
            </Form.Item>
            <Form.Item label="Price" name="price" initialValue={data?.price}>
              <Input placeholder="3000" />
            </Form.Item>
            <Form.Item label="Expiry Date" name="expiredAt" initialValue={dayjs(data?.expiredAt)}>
              <DatePicker style={{ width: "100%" }} />
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
