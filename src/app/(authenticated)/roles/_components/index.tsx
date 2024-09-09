"use client";
import Datatable from "admiral/table/datatable/index";
import { FC, ReactElement } from "react";
import { TPaginationResponse } from "@/types/meta";
import { Page } from "admiral";
import { Button, Flex, message } from "antd";
import { DeleteOutlined, EditOutlined, EyeOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";
import { ColumnType } from "antd/es/table";
import { makeSource } from "@/utils/index";
import { Role } from "@/libs/drizzle/schema";
import { useFilter } from "@/utils/filter";
import { deleteRole } from "@/server/role/actions/role.action";

export const DashboardRolesModule: FC<{ data?: TPaginationResponse<Role[]> }> = ({
  data,
}): ReactElement => {
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
              href={`/roles/${record?.id}`}
              type="link"
              icon={<EyeOutlined style={{ color: "green" }} />}
            />
            <Button
              icon={<DeleteOutlined style={{ color: "red" }} />}
              type="link"
              onClick={() => {
                deleteRole(record?.id as string);
                router.refresh();
                message.success("Role berhasil dihapus");
              }}
            />
            <Button href={`/roles/form?id=${record?.id}`} type="link" icon={<EditOutlined />} />
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
          path: "/roles",
        },
      ]}
      topActions={
        <Button href="/roles/form" icon={<PlusCircleOutlined />}>
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
