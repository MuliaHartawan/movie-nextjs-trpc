"use client";
import { DeleteOutlined, EditOutlined, EyeOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { DataTable, Page } from "admiral";
import { Button, Flex, message, Modal } from "antd";
import { ColumnsType } from "antd/es/table";
import Link from "next/link";
import React, { useState } from "react";
import { TStudio } from "./_types/studio-type";
import { trpc } from "@/libs/trpc";
import { makePagination, makeSource } from "@/utils/datatable";
import { useFilter } from "@/hooks/datatable/use-filter";
import { Guard } from "@/app/_components/guard";
import { PERMISSIONS } from "@/common/enums/permissions.enum";

const StudioPage = () => {
  const { filters, handleChange, pagination } = useFilter();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedData, setSeletctedData] = useState<string>("");
  const { data, isLoading } = trpc.studio.getStudios.useQuery({
    ...makePagination(pagination),
    search: filters.search,
  });
  const utils = trpc.useUtils();
  const { mutate, isLoading: isDeleteStudioLoad } = trpc.studio.deleteStudio.useMutation({
    onSuccess() {
      utils.studio.getStudios.invalidate();
      message.success("Success delete the data", 1.2).then(() => {
        setIsModalOpen(false);
      });
    },
    onError() {
      message.error("Error occurs when delete the data, please try again");
    },
  });

  const columns: ColumnsType<TStudio> = [
    {
      dataIndex: "name",
      key: "name",
      title: "Name",
    },
    {
      dataIndex: "capacity",
      key: "capacity",
      title: "Capacity",
    },
    {
      dataIndex: "additionalFacilities",
      key: "additionalFacilities",
      title: "Additional Facilities",
    },
    {
      dataIndex: "Action",
      title: "Action",
      key: "Action",
      render: (_, record) => {
        return (
          <Flex>
            <Guard permissions={[PERMISSIONS.STUDIO_DETAIL]}>
              {" "}
              <Button
                href={`/studio/${record?.id}`}
                type="link"
                icon={<EyeOutlined style={{ color: "green" }} />}
              />
            </Guard>
            <Guard permissions={[PERMISSIONS.STUDIO_DELETE]}>
              <Button
                icon={<DeleteOutlined style={{ color: "red" }} />}
                type="link"
                onClick={() => {
                  setSeletctedData(record.id);
                  setIsModalOpen(true);
                }}
              />
            </Guard>

            <Guard permissions={[PERMISSIONS.STUDIO_UPDATE]}>
              <Button href={`/studio/${record?.id}/update`} type="link" icon={<EditOutlined />} />
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
      label: "studio",
      path: "/studio",
    },
  ];

  return (
    <Page title="Studio" breadcrumbs={breadcrumbs} topActions={<TopAction />}>
      <DataTable
        showRowSelection={false}
        columns={columns}
        source={makeSource(data)}
        loading={isLoading}
        onChange={handleChange}
      />
      <Modal
        title="Basic Modal"
        open={isModalOpen}
        onCancel={() => {
          setIsModalOpen(false);
        }}
        onOk={() => {
          mutate(selectedData);
        }}
        okButtonProps={{
          loading: isDeleteStudioLoad,
        }}
      >
        <p>Are you sure want to delete the data?</p>
      </Modal>
    </Page>
  );
};

const TopAction = () => (
  <Guard permissions={[PERMISSIONS.STUDIO_CREATE]}>
    <Link href="/studio/create">
      <Button icon={<PlusCircleOutlined />}>Add Studio</Button>
    </Link>
  </Guard>
);

export default StudioPage;
