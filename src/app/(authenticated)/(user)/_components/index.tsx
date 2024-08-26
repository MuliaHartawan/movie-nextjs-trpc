"use client";
import type { FC, ReactElement } from "react";
import { TPaginationResponse } from "@/types/meta";
import { Page } from "admiral";
import { Button, Flex, message } from "antd";
import { DeleteOutlined, EditOutlined, EyeOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";
import Datatable from "admiral/table/datatable/index";
import { ColumnsType } from "antd/es/table";
import { makeSource } from "@/utils/index";
import { useFilter } from "@/utils/filter";
import { User } from "@/libs/drizzle/schemas/user.schema";
import { deleteUserAction } from "@/server/user/actions/user.action";
import { PERMISSIONS } from "@/common/enums/permissions.enum";
import { Guard } from "@/components/guard";

export const DashboardUsersModule: FC<{ data: TPaginationResponse<User[]> }> = ({
  data,
}): ReactElement => {
  const router = useRouter();
  const { implementDataTable, filter } = useFilter();

  const columns: ColumnsType<User> = [
    {
      dataIndex: "fullname",
      key: "fullname",
      title: "Name",
    },
    {
      dataIndex: "email",
      title: "Email",
      key: "email",
    },
    {
      dataIndex: "createdAt",
      title: "Created At",
      key: "createdAt",
      render: (_, record) => {
        return new Date(record.createdAt as Date).toLocaleString();
      },
    },
    {
      dataIndex: "Action",
      title: "Action",
      key: "Action",
      render: (_, record) => {
        return (
          <Flex>
            <Guard permissions={[PERMISSIONS.USER_READ]}>
              <Button
                href={`/users/${record?.id}`}
                type="link"
                icon={<EyeOutlined style={{ color: "green" }} />}
              />
            </Guard>
            <Guard permissions={[PERMISSIONS.USER_DELETE]}>
              <Button
                icon={<DeleteOutlined style={{ color: "red" }} />}
                type="link"
                onClick={() => {
                  deleteUserAction(record?.id as string);
                  router.refresh();
                  message.success("User berhasil dihapus");
                }}
              />
            </Guard>
            <Guard permissions={[PERMISSIONS.USER_DETAIL]}>
              <Button href={`/users/form?id=${record?.id}`} type="link" icon={<EditOutlined />} />
            </Guard>
          </Flex>
        );
      },
    },
  ];

  return (
    <Page
      title="Users"
      breadcrumbs={[
        {
          label: "Dashboard",
          path: "/dashboard",
        },
        {
          label: "Users",
          path: "/users",
        },
      ]}
      topActions={
        <Guard permissions={[PERMISSIONS.USER_CREATE]}>
          <Button href="/users/form" icon={<PlusCircleOutlined />}>
            Add Users
          </Button>
        </Guard>
      }
    >
      <Datatable
        onChange={implementDataTable}
        rowKey="id"
        showRowSelection={false}
        source={makeSource(data)}
        columns={columns}
        search={filter.search}
      />
    </Page>
  );
};
