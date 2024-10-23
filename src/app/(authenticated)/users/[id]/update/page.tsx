"use client";

import { FormUser } from "../../_components/form-user";
import { Page } from "admiral";
import { Col, message, Row } from "antd";
import { TCreateOrUpdateUserValidation } from "@/server/user/validations/create-or-update.validation";
import { useParams } from "next/navigation";
import { trpc } from "@/libs/trpc";
import { transformTRPCError } from "@/utils/error";

const UpdateUserPage = () => {
  const params = useParams();
  const userId = typeof params.id === "string" ? params.id : "";

  const userQuery = trpc.user.getUser.useQuery(userId);
  const updateUserMutation = trpc.user.updateUser.useMutation({
    onError: (error) => {
      !error.data?.zodError && message.error(error.message);
    },
  });

  const handleOnFinish = (data: TCreateOrUpdateUserValidation) =>
    updateUserMutation.mutate({ value: data, id: userId });

  const breadcrumb = [
    { label: "Dashboard", path: "/dashboard" },
    { label: "Users", path: "/Users" },
  ];

  return (
    <Page title="Update User" breadcrumbs={breadcrumb}>
      <Row>
        <Col span={12} style={{ margin: "auto" }}>
          <FormUser
            formProps={{
              onFinish: handleOnFinish,
              initialValues: userQuery.data,
              disabled: userQuery.isLoading,
            }}
            error={transformTRPCError(updateUserMutation.error)}
            loading={updateUserMutation.isLoading}
          />
        </Col>
      </Row>
    </Page>
  );
};

export default UpdateUserPage;
