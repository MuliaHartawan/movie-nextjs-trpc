"use client";

import { Page } from "admiral";
import { Button, Flex, message } from "antd";
import { DeleteOutlined, EditOutlined, EyeOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";
import Datatable from "admiral/table/datatable/index";
import { ColumnsType } from "antd/es/table";
import { deleteUserAction } from "@/server/user/actions/user.action";
import { PERMISSIONS } from "@/common/enums/permissions.enum";
import { Guard } from "@/components/guard";
import { makePagination, makeSource } from "@/utils/datatable";
import { useFilter } from "@/hooks/datatable/use-filter";
import Link from "next/link";
import { UserWithRole } from "@/libs/prisma/types/user-with-role";
import { trpc } from "@/libs/trpc";

const UsersPage = () => {
  const router = useRouter();
  const { handleChange, filters, pagination } = useFilter();

  const { data, isLoading } = trpc.user.getUsers.useQuery({
    ...makePagination(pagination),
    search: filters.search,
  });

  const columns: ColumnsType<UserWithRole> = [
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
      dataIndex: "role",
      title: "Role",
      key: "role",
      render: (_, record) => {
        return record.role?.name;
      },
    },
    {
      dataIndex: "createdAt",
      title: "Created At",
      key: "createdAt",
      render: (_, record) => {
        return new Date(record.createdAt).toLocaleString();
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
                  deleteUserAction(record?.id);
                  router.refresh();
                  message.success("User berhasil dihapus");
                }}
              />
            </Guard>
            <Guard permissions={[PERMISSIONS.USER_DETAIL]}>
              <Button href={`/users/${record?.id}/update`} type="link" icon={<EditOutlined />} />
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
      label: "Users",
      path: "/users",
    },
  ];

  return (
    <Page title="Users" breadcrumbs={breadcrumbs} topActions={<TopAction />}>
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

export default UsersPage;

const TopAction = () => (
  <Guard permissions={[PERMISSIONS.USER_CREATE]}>
    <Link href="/users/create">
      <Button icon={<PlusCircleOutlined />}>Add Users</Button>
    </Link>
  </Guard>
);
