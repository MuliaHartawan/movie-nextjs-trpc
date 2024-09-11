"use client";

import { FormRoles } from "../../_components/form-roles";
import { Col, Row } from "antd";
import { Page } from "admiral";
import { useParams } from "next/navigation";
import { useRoleQuery } from "../_hooks/role-by-id-query";
import { PERMISSIONS } from "@/common/enums/permissions.enum";
import { useUpdateRoleMutation } from "./_hooks/update-role-mutation";
import { TCreateOrUpdateRoleValidation } from "@/server/role/validations/create-or-update-role.validation";

const DashboardCreateRolesPage = () => {
  const params = useParams();
  const roleId = params.id.toString() ?? "";

  const updateRoleMutation = useUpdateRoleMutation();

  const { data, isLoading } = useRoleQuery(roleId);

  const permissionOptions = Object.values(PERMISSIONS).map((value) => ({
    value: value,
    label: value,
  }));

  const handleOnFinish = async (value: TCreateOrUpdateRoleValidation) => {
    await updateRoleMutation.mutate({
      value,
      id: roleId,
    });
  };

  return (
    <Page
      title="Add Role"
      breadcrumbs={[
        {
          label: "Dashboard",
          path: "/dashboard",
        },
        {
          label: "Roles",
          path: "/Roles",
        },
      ]}
    >
      <Row>
        <Col span={12} style={{ margin: "auto" }}>
          <FormRoles
            formProps={{ initialValues: data, onFinish: handleOnFinish }}
            options={{
              permissions: permissionOptions,
            }}
            loading={updateRoleMutation.isPending || isLoading}
          />
        </Col>
      </Row>
    </Page>
  );
};

export default DashboardCreateRolesPage;
