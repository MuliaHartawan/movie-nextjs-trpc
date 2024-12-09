"use client";

import { useFormErrorHandling } from "@/hooks/form/use-form-error-handling";
import { CustomException } from "@/types/cutom-exception";
import {
  FormProps,
  Form,
  Input,
  DatePicker,
  Button,
  Select,
  Upload,
  message,
  UploadFile,
} from "antd";
import dayjs from "dayjs";
import React, { FC, useCallback, useEffect, useState } from "react";
import { UploadProps } from "antd/lib";
import Icon from "@ant-design/icons";
import { TMovieData } from "../../_types/movie-type";

type Props = {
  formProps: FormProps;
  loading: boolean;
  error: CustomException | null;
  initValues?: TMovieData;
};

const FormMovie: FC<Props> = ({ formProps, error, loading, initValues }) => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState<UploadFile[]>();

  useEffect(() => {
    form.setFieldsValue({
      title: initValues?.title,
      description: initValues?.description,
      duration: initValues?.duration,
      releaseDate: initValues ? dayjs(initValues?.releaseDate) : null,
      rating: initValues?.rating,
      movieGenres: initValues?.movieGenres?.map((movieGenre: any) => movieGenre.genreId),
    });
    if (initValues != null) {
      setFileList([
        {
          uid: "0",
          name: "latest movie image",
          status: "done",
          url: initValues?.poster ?? "",
        },
      ]);
    }
  }, [initValues]);

  useFormErrorHandling(form, error);

  const genre: any[] = [
    {
      genreId: "8bfccd4b-dfeb-4db0-b979-84a0841c817d",
      //label: "Action",
      genre: {
        name: "Action",
      },
    },
    {
      genreId: "9e361877-ef12-4220-bc88-c0a3957d6027",
      //label: "Drama",
      genre: {
        name: "Drama",
      },
    },
    {
      genreId: "4cb9781b-138b-4efe-8f6f-99bfb8836130",
      //label: "Comedy",
      genre: {
        name: "Comedy",
      },
    },
  ];

  const uploadProps: UploadProps = {
    name: "file",
    maxCount: 1,
    beforeUpload(file: any) {
      const isImage = file.type.startsWith("image/");
      if (!isImage) {
        message.error("You can only upload image files!");
      } else {
        setFileList([file]);
      }
      return isImage;
    },
    onRemove: (file) => {
      setFileList([]);
    },
  };

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
        <Form.Item
          label="New Poster URL"
          name="poster"
          rules={[
            {
              validator: (_, values) => {
                if (fileList?.length == 0 || fileList == undefined) {
                  return Promise.reject("*Movies poster cant null!");
                }
                return Promise.resolve();
              },
            },
          ]}
        >
          <Upload {...uploadProps} fileList={fileList}>
            <Button>
              <Icon type="upload" /> Upload
            </Button>
          </Upload>
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
