"use client";
import { useFilter } from "@/hooks/datatable/use-filter";
import { trpc } from "@/libs/trpc";
import { DeleteOutlined, EditOutlined, EyeOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { DataTable, Page } from "admiral";
import { Button, Flex, message, Modal } from "antd";
import Link from "next/link";
import React, { useState } from "react";
import { makeSource, makePagination } from "@/utils/datatable";
import { ColumnsType } from "antd/es/table";
import { TScheduleCollumn } from "./_types/schedule-types";
import { Guard } from "@/app/_components/guard";
import { PERMISSIONS } from "@/common/enums/permissions.enum";

const SchedulePage = () => {
  const { filters, handleChange, pagination } = useFilter();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedData, setSelectedData] = useState<string>("");
  const utils = trpc.useUtils();
  const { data, isLoading } = trpc.screenSchedule.getScreenSchedules.useQuery({
    ...makePagination(pagination),
    search: filters.search,
  });
  const { mutate: deleteSchedule, isLoading: isDeleteLoading } =
    trpc.screenSchedule.deleteScreenSchedule.useMutation({
      onSuccess() {
        utils.screenSchedule.getScreenSchedules.invalidate();
        message.success("Success delete the movie schedule", 1.2).then(() => {
          setIsModalOpen(false);
        });
      },
      onError() {
        message.error("Error occurs when delete movie shcedule");
      },
    });

  const columns: ColumnsType<TScheduleCollumn> = [
    {
      dataIndex: "movieId",
      key: "movieId",
      title: "Movie ID",
    },
    {
      dataIndex: "studioId",
      key: "studioId",
      title: "Studio ID",
    },
    {
      dataIndex: "screeningTime",
      key: "screeningTime",
      title: "Screening Time",
      render: (screenTime: Date) => {
        return <p>{screenTime.toLocaleString("en-GB")}</p>;
      },
    },
    {
      dataIndex: "price",
      key: "price",
      title: "Price",
    },
    {
      dataIndex: "Action",
      title: "Action",
      key: "Action",
      render: (_, record) => {
        return (
          <Flex>
            <Guard permissions={[PERMISSIONS.SCREEN_SCHEDULE_DETAIL]}>
              <Button
                href={`/schedule/${record?.id}`}
                type="link"
                icon={<EyeOutlined style={{ color: "green" }} />}
              />
            </Guard>
            <Guard permissions={[PERMISSIONS.SCREEN_SCHEDULE_DELETE]}>
              <Button
                icon={<DeleteOutlined style={{ color: "red" }} />}
                type="link"
                onClick={() => {
                  setSelectedData(record.id);
                  setIsModalOpen(true);
                }}
              />
            </Guard>
            <Guard permissions={[PERMISSIONS.SCREEN_SCHEDULE_UPDATE]}>
              <Button href={`/schedule/${record?.id}/update`} type="link" icon={<EditOutlined />} />
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
      label: "Schedule",
      path: "/schedule",
    },
  ];

  return (
    <Page title="Movie Schedule" breadcrumbs={breadcrumbs} topActions={<TopAction />}>
      <DataTable
        loading={isLoading}
        search={filters.search}
        source={makeSource(data)}
        onChange={handleChange}
        columns={columns}
        showRowSelection={false}
      />
      <Modal
        title="Delete Schedule"
        open={isModalOpen}
        onCancel={() => {
          setIsModalOpen(false);
        }}
        onOk={() => {
          deleteSchedule(selectedData);
        }}
        okButtonProps={{
          loading: isDeleteLoading,
        }}
      >
        Are you sure want to delete?
      </Modal>
    </Page>
  );
};

const TopAction = () => (
  <Guard permissions={[PERMISSIONS.SCREEN_SCHEDULE_CREATE]}>
    <Link href="/schedule/create">
      <Button icon={<PlusCircleOutlined />}>Add Schedule</Button>
    </Link>
  </Guard>
);

export default SchedulePage;
