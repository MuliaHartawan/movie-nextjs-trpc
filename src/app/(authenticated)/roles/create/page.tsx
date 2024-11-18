"use client";

import { FormRole } from "../_components/form-roles";
import { Col, Row } from "antd";
import { Page } from "admiral";
import { useCreateRoleMutation } from "./_hooks/use-create-role-mutation";
import { TCreateOrUpdateRoleValidation } from "@/server/role/validations/create-or-update-role.validation";

const CreateRolePage = () => {
  const createRoleMutation = useCreateRoleMutation();

  const handleOnFinish = async (value: TCreateOrUpdateRoleValidation) =>
    createRoleMutation.mutate(value);

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
    <Page title="Add Role" breadcrumbs={breadcrumbs}>
      <Row>
        <Col span={12} style={{ margin: "auto" }}>
          <FormRole
            formProps={{ onFinish: handleOnFinish }}
            error={createRoleMutation.error}
            loading={createRoleMutation.isLoading}
          />
        </Col>
      </Row>
    </Page>
  );
};

export default CreateRolePage;
