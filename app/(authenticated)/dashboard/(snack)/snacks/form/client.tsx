"use client";

import { Page } from "admiral";
import { Button, Col, DatePicker, Form, Input, Row } from "antd";
import { Snack } from "../../_actions/get-snacks";
import { useSnackAction } from "../../_hooks";
import dayjs from "dayjs";

const DashboardCreateSnacksClient = ({ data, snackId }: { data: Snack; snackId: string }) => {
  const { updateSnackMutation, addSnackMutation } = useSnackAction();
  const [form] = Form.useForm();
  const handleAddProduct = async (values: Snack) => {
    // TODO : WIP Update with real data
    console.log("values", values);
    if (snackId) {
      await updateSnackMutation.mutateAsync({
        value: {
          ...values,
          expiryDate: dayjs(values.expiryDate).format("YYYY-MM-DD"),
        },
        id: snackId,
      });
    } else {
      addSnackMutation.mutate({
        ...values,
        expiryDate: dayjs(values.expiryDate).format("YYYY-MM-DD"),
      });
    }

    form.resetFields();
  };
  return (
    <Page
      title="CreateSnacks"
      breadcrumbs={[
        {
          label: "Dashboard",
          path: "/dashboard",
        },
        {
          label: "Snacks",
          path: "/dashboard/snacks",
        },
      ]}
    >
      <Row>
        <Col span={12} style={{ margin: "auto" }}>
          <Form form={form} onFinish={handleAddProduct} layout="vertical">
            <Form.Item label="Name" name="name" initialValue={data?.name}>
              <Input placeholder="John Doe" />
            </Form.Item>
            <Form.Item label="Cost" name="cost" initialValue={data?.cost}>
              <Input placeholder="3000" />
            </Form.Item>
            <Form.Item label="Expiry Date" name="expiryDate" initialValue={dayjs(data?.expiryDate)}>
              <DatePicker style={{ width: "100%" }} />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </Page>
  );
};

export default DashboardCreateSnacksClient;
