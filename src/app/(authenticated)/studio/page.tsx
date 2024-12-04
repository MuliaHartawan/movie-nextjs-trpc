"use client";
import { DeleteOutlined, EditOutlined, EyeOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { DataTable, Page } from "admiral";
import { Button, Flex } from "antd";
import { ColumnsType } from "antd/es/table";
import Link from "next/link";
import React from "react";
import { TStudio } from "./_types/studio-type";

const StudioPage = () => {
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
            <Button
              href={`/users/${record?.id}`}
              type="link"
              icon={<EyeOutlined style={{ color: "green" }} />}
            />

            <Button icon={<DeleteOutlined style={{ color: "red" }} />} type="link" />

            <Button href={`/users/${record?.id}/update`} type="link" icon={<EditOutlined />} />
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
      <DataTable showRowSelection={false} columns={columns} />
    </Page>
  );
};

const TopAction = () => (
  //Ada Guard
  <Link href="/users/create">
    <Button icon={<PlusCircleOutlined />}>Add Users</Button>
  </Link>
);

export default StudioPage;
