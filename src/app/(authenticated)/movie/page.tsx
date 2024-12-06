"use client";
import React from "react";

import { Page } from "admiral";
import Datatable from "admiral/table/datatable/index";
import { makePagination, makeSource } from "@/utils/datatable";
import { ColumnsType } from "antd/es/table";
import Link from "next/link";
import { Button, Flex } from "antd";
import { DeleteOutlined, EditOutlined, EyeOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { useFilter } from "@/hooks/datatable/use-filter";
import { TPaginationResponse } from "@/types/meta";
import { trpc } from "@/libs/trpc";
import { TMovie } from "./_types/movie-type";
import { truncateText } from "./_utils/truncate-text";
import { transformMinutesToHours } from "./_utils/transform-minute";

const MoviePage = () => {
  const { filters, handleChange, pagination } = useFilter();

  const { data, isLoading } = trpc.movie.getMovies.useQuery({
    ...makePagination(pagination),
    search: filters.search,
  });

  const columns: ColumnsType<TMovie> = [
    {
      dataIndex: "title",
      key: "title",
      title: "Title",
    },
    {
      dataIndex: "description",
      key: "description",
      title: "Description",
      render: (value, record) => {
        return <p>{truncateText(value)}</p>;
      },
    },
    {
      dataIndex: "rating",
      key: "rating",
      title: "Rating",
    },
    {
      dataIndex: "duration",
      key: "duration",
      title: "Duration",
      render: (value, record) => {
        return <p>{transformMinutesToHours(value)}</p>;
      },
    },
    {
      dataIndex: "action",
      key: "action",
      title: "Action",
      render: (val, record) => {
        return (
          <Flex>
            <Button
              href={`/movie/${record?.id}`}
              type="link"
              icon={<EyeOutlined style={{ color: "green" }} />}
            />
            <Button icon={<DeleteOutlined style={{ color: "red" }} />} type="link" />
            <Button href={`/movie/${record?.id}/update`} type="link" icon={<EditOutlined />} />
          </Flex>
        );
      },
    },
  ];

  const breadcrumbs = [
    {
      label: "Dashboard",
      path: "/dashboard",
    },
    {
      label: "Movie",
      path: "/movie",
    },
  ];

  return (
    <Page title="Movie" breadcrumbs={breadcrumbs} topActions={<TopAction />}>
      <p>Movie Page</p>
      <Datatable
        onChange={handleChange}
        rowKey="id"
        showRowSelection={false}
        source={makeSource(data)}
        columns={columns}
        loading={isLoading}
        search={filters.search}
      />
    </Page>
  );
};

const TopAction = () => (
  //<Guard permissions={[PERMISSIONS.USER_CREATE]}>
  <Link href="/movie/create">
    <Button icon={<PlusCircleOutlined />}>Add Movie</Button>
  </Link>
  //</Guard>
);

export default MoviePage;
