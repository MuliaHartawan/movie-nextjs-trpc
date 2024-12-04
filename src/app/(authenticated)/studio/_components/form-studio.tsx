import { CustomException } from "@/types/cutom-exception";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Flex, Form, FormProps, Input } from "antd";
import React from "react";

type Props = {
  formProps: FormProps;
  loading: boolean;
  error: CustomException | null;
};

const FormStudio = ({ formProps, loading, error }: Props) => {
  const [form] = Form.useForm();
  return (
    <Form {...formProps} form={form} layout="vertical">
      <Form.Item
        label="Studio Name"
        name="name"
        rules={[{ required: true, message: "Studio Name required!" }]}
      >
        <Input placeholder="Studio Name" />
      </Form.Item>
      <Form.Item
        label="Capacity"
        name="capacity"
        rules={[{ required: true, message: "Studio Capacity required!" }]}
      >
        <Input placeholder="Capacity" type="number" min={0} />
      </Form.Item>
      <Form.List name="additionalFacilities">
        {(fields, { add, remove }) => (
          <>
            <Flex vertical gap={24} style={{ marginBottom: "24px" }}>
              {fields.map((field, index) => (
                <Flex align="center" gap={12} key={index}>
                  <Form.Item {...field} style={{ marginBottom: 0, width: "60%" }}>
                    <Input placeholder="Additional Facilities" type="text" />
                  </Form.Item>
                  <MinusCircleOutlined onClick={() => remove(field.name)} />
                </Flex>
              ))}
            </Flex>
            <Form.Item>
              <Button type="dashed" onClick={() => add()} icon={<PlusOutlined />}>
                Add Facilities
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>
      <Form.Item>
        <Button type="primary" htmlType="submit" loading={loading}>
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default FormStudio;
