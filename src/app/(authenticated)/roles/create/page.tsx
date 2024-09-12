"use client";

import { FormRoles } from "../_components/form-roles";
import { Col, Row } from "antd";
import { Page } from "admiral";
import { PERMISSIONS } from "@/common/enums/permissions.enum";
import { useCreateRoleMutation } from "./_hooks/create-role-mutation";
import { TCreateOrUpdateRoleValidation } from "@/server/role/validations/create-or-update-role.validation";

const CreateRolePage = () => {
  const createRoleMutation = useCreateRoleMutation();

  const permissionOptions = Object.values(PERMISSIONS).map((value) => ({
    value: value,
    label: value,
  }));

  const handleOnFinish = async (value: TCreateOrUpdateRoleValidation) => {
    await createRoleMutation.mutate(value);
  };

  const title = "Add Role";
  const breadcrumbs = [
    {
      label: "Dashboard",
      path: "/dashboard",
    },
    {
      label: "Roles",
      path: "/Roles",
    },
  ];

  return (
    <Page title={title} breadcrumbs={breadcrumbs}>
      <Row>
        <Col span={12} style={{ margin: "auto" }}>
          <FormRoles
            // TODO: example error handling
            formProps={{ onFinish: handleOnFinish }}
            options={{
              permissions: permissionOptions,
            }}
            loading={createRoleMutation.isPending}
          />
        </Col>
      </Row>
    </Page>
  );
};

export default CreateRolePage;
