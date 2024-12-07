"use client";

import { useFilter } from "@/hooks/datatable/use-filter";
import { useFormErrorHandling } from "@/hooks/form/use-form-error-handling";
import { trpc } from "@/libs/trpc";
import { CustomException } from "@/types/cutom-exception";
import { makePagination } from "@/utils/datatable";
import { Button, DatePicker, Flex, Form, FormProps, Input, message, Select } from "antd";
import dayjs from "dayjs";
import React, { FC, useEffect } from "react";

type Props = {
  formProps: FormProps;
  loading: boolean;
  error: CustomException | null;
  initialValue?: any;
};

const FormSchedule: FC<Props> = ({ formProps, loading, error, initialValue }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({
      movieId: initialValue?.movieId,
      studioId: initialValue?.studioId,
      price: initialValue?.price,
      screeningTime: initialValue ? dayjs(initialValue?.screeningTime) : null,
    });
  }, [initialValue]);

  useFormErrorHandling(form, error);

  const { pagination, filters } = useFilter();

  const { data: movieOptions, isLoading: isGetMovieLoad } = trpc.movie.getMovies.useQuery({
    ...makePagination(pagination),
    search: filters.search,
  });

  const { data: studioOptions, isLoading: isStudioLoad } = trpc.studio.getStudios.useQuery({
    ...makePagination(pagination),
    search: filters.search,
  });

  return (
    <Form {...formProps} form={form} layout="vertical" disabled={isGetMovieLoad && isStudioLoad}>
      <Form.Item
        label="Movie"
        name="movieId"
        rules={[{ required: true, message: "Movie must be filled" }]}
        style={{ width: "100%" }}
      >
        <Select loading={isGetMovieLoad}>
          {movieOptions?.data.map((movie, index) => (
            <Select.Option value={movie.id} key={index}>
              {movie.title}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item
        label="Studio"
        name="studioId"
        rules={[{ required: true, message: "Studio must be filled" }]}
        style={{ width: "100%" }}
      >
        <Select loading={isStudioLoad}>
          {studioOptions?.data.map((studio, index) => (
            <Select.Option value={studio.id} key={index}>
              {studio.name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item
        label="Price"
        name="price"
        rules={[{ required: true, message: "Price must be filled" }]}
      >
        <Input type="number" placeholder="Price" min={0} />
      </Form.Item>
      <Form.Item
        label="Movie Schedule"
        name="screeningTime"
        rules={[{ required: true, message: "Time must be filled" }]}
      >
        <DatePicker />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" loading={loading}>
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default FormSchedule;
