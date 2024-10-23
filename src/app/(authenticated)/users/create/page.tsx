"use client";

import { FormUser } from "../_components/form-user";
import { Page } from "admiral";
import { Col, message, Row } from "antd";
import { TCreateOrUpdateUserValidation } from "@/server/user/validations/create-or-update.validation";
import { trpc } from "@/libs/trpc";
import { transformTRPCError } from "@/utils/error";

const CreateUserPage = () => {
  const breadcrumb = [
    { label: "Dashboard", path: "/dashboard" },
    { label: "Users", path: "/Users" },
  ];

  const createUserMutation = trpc.user.createUser.useMutation({
    onError: (error) => {
      !error.data?.zodError && message.error(error.message);
    },
  });

  const handleOnFinish = (data: TCreateOrUpdateUserValidation) => createUserMutation.mutate(data);

  return (
    <Page title="Add User" breadcrumbs={breadcrumb}>
      <Row>
        <Col span={12} style={{ margin: "auto" }}>
          <FormUser
            formProps={{ onFinish: handleOnFinish }}
            error={transformTRPCError(createUserMutation.error)}
            loading={createUserMutation.isLoading}
          />
        </Col>
      </Row>
    </Page>
  );
};

export default CreateUserPage;
