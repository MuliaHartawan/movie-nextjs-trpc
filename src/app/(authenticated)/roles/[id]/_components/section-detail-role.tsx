"use client";

import { Role } from "@/libs/drizzle/schemas/role.schema";
import { Section } from "admiral";
import { Descriptions } from "antd";
import { FC, ReactElement } from "react";

export const SectionDetailRole: FC<{ data?: Role; loading: boolean }> = ({
  data,
  loading,
}): ReactElement => {
  return (
    <Section loading={loading} title="Detail Roles">
      <Descriptions bordered column={2}>
        <Descriptions.Item span={2} label="Name">
          {data?.name}
        </Descriptions.Item>
        <Descriptions.Item span={2} label="Permission">
          {data?.rolePermissions?.map((rolePermission) => (
            <div key={rolePermission.permission?.id}>{rolePermission.permission?.name}</div>
          ))}
        </Descriptions.Item>
      </Descriptions>
    </Section>
  );
};
