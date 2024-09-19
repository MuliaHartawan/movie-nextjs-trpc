"use client";

import { Role } from "@prisma/client";
import { DataTable, Page } from "admiral";
import { DeleteOutlined, EditOutlined, EyeOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { Button, Flex, message } from "antd";
import { useRolesQuery } from "./_hooks/use-roles-query";
import Link from "next/link";
import { makeSource } from "@/utils/index";
import { deleteRole } from "@/server/role/actions/role.action";
import { ColumnType } from "antd/es/table";
import { useRouter } from "next/navigation";
import { useFilter, usePaginateFilter } from "@/utils/filter";

const RolesPage = () => {
  const paginateFilter = usePaginateFilter();

  const { data, isLoading } = useRolesQuery(paginateFilter);

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

  const breadcrumbs = [
    {
      label: "Dashboard",
      path: "/dashboard",
    },
    {
      label: "Roles",
      path: "/roles",
    },
  ];

  return (
    <Page
      title="Roles"
      breadcrumbs={breadcrumbs}
      topActions={
        <Link href="/roles/create">
          <Button icon={<PlusCircleOutlined />}>Add Roles</Button>
        </Link>
      }
    >
      <DataTable
        source={makeSource(data)}
        columns={columns}
        onChange={implementDataTable}
        loading={isLoading}
        search={filter.search}
      />
    </Page>
  );
};

export default RolesPage;