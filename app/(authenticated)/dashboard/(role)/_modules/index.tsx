"use client";
import Datatable from "admiral/table/datatable/index";
import { FC } from "react";
import { TMetaResponse } from "@/types/meta";
import { Page } from "admiral";
import { Button, Flex, message } from "antd";
import { DeleteOutlined, EditOutlined, EyeOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { deleteRoleAction } from "../_actions/delete-role";
import { useRouter } from "next/navigation";
import { ColumnType } from "antd/es/table";
import { makeSource } from "@/utils";
import { Role } from "@/libs/drizzle/schema";
import { useFilter } from "@/utils/filter";

export const DashboardRolesModule: FC<{ data: TMetaResponse<Role[]> }> = ({ data }) => {
  const router = useRouter();
  const { implementDataTable, filter } = useFilter();

  const columns: ColumnType<Role>[] = [
    {
      dataIndex: "name",
      key: "name",
      title: "Name",
      width: "10%",
    },
    {
      dataIndex: "Action",
      key: "Action",
      title: "Action",
      render: (_, record) => {
        return (
          <Flex>
            <Button
              href={`/dashboard/roles/${record?.id}`}
              type="link"
              icon={<EyeOutlined style={{ color: "green" }} />}
            />
            <Button
              icon={<DeleteOutlined style={{ color: "red" }} />}
              type="link"
              onClick={() => {
                deleteRoleAction(record?.id as string);
                router.refresh();
                message.success("Role berhasil dihapus");
              }}
            />
            <Button
              href={`/dashboard/roles/form?id=${record?.id}`}
              type="link"
              icon={<EditOutlined />}
            />
          </Flex>
        );
      },
    },
  ];

  return (
    <Page
      title="Roles"
      breadcrumbs={[
        {
          label: "Dashboard",
          path: "/dashboard",
        },
        {
          label: "Roles",
          path: "/dashboard/roles",
        },
      ]}
      topActions={
        <Button href="/dashboard/roles/form" icon={<PlusCircleOutlined />}>
          Add Roles
        </Button>
      }
    >
      <Datatable
        source={makeSource(data)}
        columns={columns}
        onChange={implementDataTable}
        search={filter.search}
      />
    </Page>
  );
};
