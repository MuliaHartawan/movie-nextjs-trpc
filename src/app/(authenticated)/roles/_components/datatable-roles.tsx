"use client";

import Datatable from "admiral/table/datatable/index";
import { FC, ReactElement } from "react";
import { TPaginationResponse } from "@/types/meta";
import { Button, Flex, message } from "antd";
import { DeleteOutlined, EditOutlined, EyeOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";
import { ColumnType } from "antd/es/table";
import { makeSource } from "@/utils/index";
import { useFilter } from "@/utils/filter";
import { deleteRole } from "@/server/role/actions/role.action";
import { Role } from "@/libs/drizzle/schemas/role.schema";

type Props = { data?: TPaginationResponse<Role[]>; loading: boolean };

export const DatatableRoles: FC<Props> = ({ data, loading }): ReactElement => {
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
    <Datatable
      source={makeSource(data)}
      columns={columns}
      onChange={implementDataTable}
      loading={loading}
      search={filter.search}
    />
  );
};
