"use client";

import type { FormProps } from "antd";
import { Button, Checkbox, Form, Input } from "antd";
import { loginByCredentials } from "../_actions/login-action";
import { useRouter } from "next/navigation";
import { TLoginForm } from "../_entities/schema";
import { useState } from "react";

export const LoginFormComponent: React.FC = () => {
  const { push } = useRouter();
  const [loading, setLoading] = useState(false);

  const onFinish: FormProps<TLoginForm>["onFinish"] = async (values) => {
    setLoading(true);
    const res = await loginByCredentials(values);
    if (res.success) {
      push("/dashboard");
    }
    setLoading(false);
  };

  const onFinishFailed: FormProps<TLoginForm>["onFinishFailed"] = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item<TLoginForm>
        label="Email"
        name="email"
        rules={[{ required: true, message: "Please input your username!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item<TLoginForm>
        label="Password"
        name="password"
        rules={[{ required: true, message: "Please input your password!" }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type={"primary"} loading={loading} htmlType="submit">
          Login
        </Button>
      </Form.Item>
    </Form>
  );
};
