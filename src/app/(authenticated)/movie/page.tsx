"use client";
import React from "react";

import { Page } from "admiral";
import Datatable from "admiral/table/datatable/index";
import { makeSource } from "@/utils/datatable";
import { ColumnsType } from "antd/es/table";
import Link from "next/link";
import { Button, Flex } from "antd";
import { DeleteOutlined, EditOutlined, EyeOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { useFilter } from "@/hooks/datatable/use-filter";
import { TPaginationResponse } from "@/types/meta";

const MoviePage = () => {
  const { filters, handleChange, pagination } = useFilter();

  const data: TPaginationResponse<any> = {
    data: [],
    meta: {
      page: 1,
      perPage: 10,
      total: 100,
      totalPage: 20,
    },
  };

  const columns: ColumnsType<TMovie> = [
    {
      dataIndex: "title",
      key: "title",
      title: "Title",
    },
    {
      dataIndex: "releaseDate",
      key: "releaseData",
      title: "Release Date",
    },
    {
      dataIndex: "rating",
      key: "rating",
      title: "Rating",
    },
    {
      dataIndex: "genre",
      key: "genre",
      title: "Genre",
    },
    {
      dataIndex: "Action",
      key: "action",
      title: "Action",
      render: (_, record) => {
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
        loading={false}
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
