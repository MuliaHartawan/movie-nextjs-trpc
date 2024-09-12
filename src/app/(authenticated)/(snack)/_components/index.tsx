"use client";
import Datatable from "admiral/table/datatable/index";
import { FC } from "react";
import { TPaginationResponse } from "@/types/meta";
import { Page } from "admiral";
import { Button, Flex, Modal, message } from "antd";
import { DeleteOutlined, EditOutlined, EyeOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";
import { ColumnType } from "antd/es/table";
import { makeSource } from "@/utils/index";
import { useFilter } from "@/utils/filter";
import { deleteSnackAction } from "@/server/snack/actions/snack.action";
import { Snack } from "@prisma/client";

const { confirm } = Modal;
export const DashboardSnacksModule: FC<{ data: TPaginationResponse<Snack[]> }> = ({ data }) => {
  const router = useRouter();
  const { implementDataTable, filter } = useFilter();

  const columns: ColumnType<Snack>[] = [
    {
      dataIndex: "name",
      key: "name",
      title: "Name",
    },
    {
      dataIndex: "price",
      title: "Price",
      key: "price",
      render: (_, row) => {
        return `Rp ${row?.price?.toLocaleString()}`;
      },
    },
    {
      dataIndex: "expiredAt",
      title: "Expiry Date",
      key: "expiredAt",
      render: (_, row) => {
        return new Date(row?.expiredAt as Date).toLocaleString();
      },
    },
    {
      dataIndex: "Action",
      title: "Action",
      key: "Action",
      render: (_, row) => {
        return (
          <Flex>
            <Button
              href={`/snacks/${row?.id}`}
              type="link"
              icon={<EyeOutlined style={{ color: "green" }} />}
            />
            <Button
              icon={<DeleteOutlined style={{ color: "red" }} />}
              type="link"
              onClick={() => {
                confirm({
                  title: "Are you sure you want to delete this snack?",
                  okText: "Delete",
                  okType: "danger",
                  icon: <DeleteOutlined />,
                  cancelText: "Cancel",
                  onOk() {
                    deleteSnackAction(row?.id as string);
                    router.refresh();
                    message.success("Snack berhasil dihapus");
                  },
                });
              }}
            />
            <Button href={`/snacks/form?id=${row?.id}`} type="link" icon={<EditOutlined />} />
          </Flex>
        );
      },
    },
  ];

  return (
    <Page
      title="Snacks"
      breadcrumbs={[
        {
          label: "Dashboard",
          path: "/dashboard",
        },
        {
          label: "Snacks",
          path: "/snacks",
        },
      ]}
      topActions={
        <Button href="/snacks/form" icon={<PlusCircleOutlined />}>
          Add Snack
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
