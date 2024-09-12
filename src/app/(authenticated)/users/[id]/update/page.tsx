"use client";

import { FormUser } from "../../_components/form-user";
import { Page } from "admiral";
import { Col, Row } from "antd";
import { TCreateOrUpdateUserValidation } from "@/server/user/validations/create-or-update.validation";
import { useUpdateUserMutation } from "./_hooks/use-update-user-mutation";
import { useParams } from "next/navigation";
import { useUserQuery } from "../_hooks/use-user-query";

const CreateUserPage = () => {
  const params = useParams();

  const userId = typeof params.id === "string" ? params.id : "";

  const userQuery = useUserQuery(userId);

  const updateUserMutation = useUpdateUserMutation();

  const handleOnFinish = (data: TCreateOrUpdateUserValidation) =>
    updateUserMutation.mutate({ value: data, id: userId });

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

  return (
    <Page title="Add User" breadcrumbs={breadcrumb}>
      <Row>
        <Col span={12} style={{ margin: "auto" }}>
          <FormUser
            formProps={{
              onFinish: handleOnFinish,
              initialValues: userQuery.data,
              disabled: userQuery.isLoading,
            }}
            error={updateUserMutation.error}
            loading={updateUserMutation.isPending}
          />
        </Col>
      </Row>
    </Page>
  );
};

export default CreateUserPage;
