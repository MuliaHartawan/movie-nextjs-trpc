"use client";

import { useFormErrorHandling } from "@/hooks/form/use-form-error-handling";
import { CustomException } from "@/types/cutom-exception";
import { FormProps, Form, Input, DatePicker, Button, Select } from "antd";
import dayjs from "dayjs";
import React, { FC, useEffect } from "react";

type Props = {
  formProps: FormProps;
  loading: boolean;
  error: CustomException | null;
  onFileChange: (file: File | null) => void;
  initValues?: any;
};

const FormMovie: FC<Props> = ({ formProps, error, loading, onFileChange, initValues }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({
      title: initValues?.title,
      description: initValues?.description,
      duration: initValues?.duration,
      releaseDate: dayjs(initValues?.releaseDate),
      rating: initValues?.rating,
      movieGenres: initValues?.movieGenres.map((movieGenre: any) => movieGenre.genreId),
    });
  }, [initValues]);

  useFormErrorHandling(form, error);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onFileChange(file);
    }
  };

  const genre: any[] = [
    {
      genreId: "60ca3357-2aa5-4439-87b7-2909e46ae191",
      //label: "Action",
      genre: {
        name: "Action",
      },
    },
    {
      genreId: "556f803d-7fa6-49af-8e17-5e82fb6c14d4",
      //label: "Drama",
      genre: {
        name: "Drama",
      },
    },
    {
      genreId: "7a7ae0ba-3ac9-41d1-9826-d65626f2b1ce",
      //label: "Comedy",
      genre: {
        name: "Comedy",
      },
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
          label="Genre"
          name="movieGenres"
          rules={[{ required: true, message: "Genre field must be filled" }]}
        >
          <Select mode="multiple">
            {genre.map((val, index) => (
              <Select.Option value={val.genreId} key={index}>
                {val.genre.name}
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
        <Form.Item label="New Poster URL" name="poster">
          {initValues && <a href={initValues?.poster}>Clik to see your old image!</a>}
          {initValues != null ? (
            <Input placeholder="New Poster URL" type="file" onChange={handleInputChange} />
          ) : (
            <Input placeholder="New Poster URL" type="file" onChange={handleInputChange} required />
          )}
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
