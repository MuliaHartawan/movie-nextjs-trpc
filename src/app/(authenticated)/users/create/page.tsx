"use client";

import { FormUser } from "../_components/form-user";
import { Page } from "admiral";
import { Col, Row } from "antd";
import { useCreateUserMutation } from "./_hooks/use-create-user-mutation";
import { TCreateOrUpdateUserValidation } from "@/server/user/validations/create-or-update.validation";

const CreateUserPage = () => {
  const breadcrumb = [
    {
      label: "Dashboard",
      path: "/dashboard",
    },
    {
      label: "Users",
      path: "/Users",
    },
  ];

  const createUserMutation = useCreateUserMutation();

  const handleOnFinish = (data: TCreateOrUpdateUserValidation) => createUserMutation.mutate(data);

  return (
    <Page title="Add User" breadcrumbs={breadcrumb}>
      <Row>
        <Col span={12} style={{ margin: "auto" }}>
          <FormUser
            formProps={{ onFinish: handleOnFinish }}
            error={createUserMutation.error}
            loading={createUserMutation.isPending}
          />
        </Col>
      </Row>
    </Page>
  );
};

export default CreateUserPage;
