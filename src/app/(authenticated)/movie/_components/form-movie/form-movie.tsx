"use client";

import { useFormErrorHandling } from "@/hooks/form/use-form-error-handling";
import { CustomException } from "@/types/cutom-exception";
import { FormProps, Form, Input, DatePicker, Button, DatePickerProps, Select } from "antd";
import React, { FC, useEffect, useState } from "react";

type Props = {
  formProps: FormProps;
  loading: boolean;
  error: CustomException | null;
};

const FormMovie: FC<Props> = ({ formProps, error, loading }) => {
  const [form] = Form.useForm();
  const [date, setDate] = useState("");

  useEffect(() => {
    form.setFieldsValue(formProps.initialValues);
  }, [formProps.initialValues]);

  useFormErrorHandling(form, error);

  const genre: any[] = [
    {
      value: "horror",
      label: "Horror",
    },
    {
      value: "comedy",
      label: "Comedy",
    },
  ];

  return (
    <Form {...formProps} form={form} layout="vertical">
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
        <Form.Item
          label="Title"
          name="title"
          rules={[{ required: true, message: "title field must be filled" }]}
        >
          <Input placeholder="Title" />
        </Form.Item>
        <Form.Item
          label="Description"
          name="description"
          rules={[{ required: true, message: "description field must be filled" }]}
        >
          <Input placeholder="Description" />
        </Form.Item>
        <Form.Item
          label="Poster URL"
          name="posterUrl"
          rules={[{ required: true, message: "Poster URL field must be filled" }]}
        >
          <Input placeholder="Poster URL" />
        </Form.Item>
        <Form.Item
          label="Genre"
          name="genre"
          rules={[{ required: true, message: "Genre field must be filled" }]}
        >
          <Select mode="multiple">
            {genre.map((val, index) => (
              <Select.Option value={val.value} key={index}>
                {val.label}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          label="Duration"
          name="duration"
          rules={[{ required: true, message: "duration field must be filled" }]}
        >
          <Input type="number" placeholder="Duration" min={1} />
        </Form.Item>
        <Form.Item
          label="Rating"
          name="rating"
          rules={[{ required: true, message: "rating field must be filled" }]}
        >
          <Input type="number" placeholder="Rating" min={0} />
        </Form.Item>
        <Form.Item
          label="Release Date"
          name="releaseDate"
          rules={[{ required: true, message: "release data must be fill" }]}
        >
          <DatePicker style={{ width: "100%" }} />
        </Form.Item>
      </div>
      <Form.Item style={{ textAlign: "end" }}>
        <Button type="primary" htmlType="submit" loading={loading}>
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default FormMovie;
