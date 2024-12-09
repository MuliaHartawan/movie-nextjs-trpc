"use client";
import React from "react";

import { Page } from "admiral";
import Datatable from "admiral/table/datatable/index";
import { makePagination, makeSource } from "@/utils/datatable";
import { ColumnsType } from "antd/es/table";
import Link from "next/link";
import { Button, Flex, message, Modal } from "antd";
import { DeleteOutlined, EditOutlined, EyeOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { useFilter } from "@/hooks/datatable/use-filter";
import { TPaginationResponse } from "@/types/meta";
import { trpc } from "@/libs/trpc";
import { TMovieCollumn } from "./_types/movie-type";
import { truncateText } from "./_utils/truncate-text";
import { transformMinutesToHours } from "./_utils/transform-minute";
import { useState } from "react";
import { Guard } from "@/app/_components/guard";
import { PERMISSIONS } from "@/common/enums/permissions.enum";

const MoviePage = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const { filters, handleChange, pagination } = useFilter();
  const utils = trpc.useUtils();
  const { mutate } = trpc.movie.deleteMovie.useMutation({
    onSuccess: () => {
      utils.movie.getMovies.invalidate();
      message.success("Success Delete the data", 1.2).then(() => {
        setIsModalOpen(false);
      });
    },
    onError: () => {
      message.error("Error occurs when delete the data");
    },
  });
  const [selectedData, setSelectedData] = useState<string>("");

  const { data, isLoading } = trpc.movie.getMovies.useQuery({
    ...makePagination(pagination),
    search: filters.search,
  });

  const columns: ColumnsType<TMovieCollumn> = [
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
            <Guard permissions={[PERMISSIONS.MOVIE_DETAIL]}>
              <Button
                href={`/movie/${record?.id}`}
                type="link"
                icon={<EyeOutlined style={{ color: "green" }} />}
              />
            </Guard>
            <Guard permissions={[PERMISSIONS.MOVIE_DELETE]}>
              <Button
                icon={<DeleteOutlined style={{ color: "red" }} />}
                type="link"
                onClick={() => {
                  setIsModalOpen(true);
                  setSelectedData(record.id);
                }}
              />
            </Guard>
            <Guard permissions={[PERMISSIONS.MOVIE_UPDATE]}>
              <Button href={`/movie/${record?.id}/update`} type="link" icon={<EditOutlined />} />
            </Guard>
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
      <Modal
        title="Basic Modal"
        open={isModalOpen}
        onOk={() => {
          mutate(selectedData);
        }}
        onCancel={() => {
          setIsModalOpen(false);
        }}
      >
        <p>Sure wanna delete the data?</p>
      </Modal>
    </Page>
  );
};

const TopAction = () => (
  <Guard permissions={[PERMISSIONS.MOVIE_CREATE]}>
    <Link href="/movie/create">
      <Button icon={<PlusCircleOutlined />}>Add Movie</Button>
    </Link>
  </Guard>
);

export default MoviePage;
