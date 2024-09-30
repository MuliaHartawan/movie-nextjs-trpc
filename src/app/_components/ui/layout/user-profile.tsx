"use client";

import { DownOutlined, ExclamationCircleFilled, LogoutOutlined } from "@ant-design/icons";
import { useIsMobileScreen } from "admiral";
import { Avatar, Dropdown, Flex, Modal, Space, Spin, Typography } from "antd";
import { logOut } from "@/libs/auth/login";
import { useSession } from "next-auth/react";

const UserProfile = () => {
  const { data } = useSession();
  const { Text } = Typography;
  const isMobile = useIsMobileScreen();
  const { confirm } = Modal;

  const showConfirmModal = () => {
    confirm({
      title: "Are you sure want to Log out?",
      icon: <ExclamationCircleFilled />,
      content:
        "Logging out will end your current session and you will need to log in again to access your account",
      onOk() {
        logOut();
      },
    });
  };

  return (
    <Dropdown
      trigger={["click"]}
      menu={{
        items: [
          {
            label: "Logout",
            icon: <LogoutOutlined />,
            key: "2",
            onClick: () => {
              showConfirmModal();
            },
          },
        ],
      }}
      placement="bottom"
    >
      <Flex
        justify="space-between"
        align="center"
        onClick={(e) => e.preventDefault()}
        style={{ padding: "8px 16px", width: "100%", cursor: "pointer" }}
      >
        <Flex gap={12} align="center">
          <Avatar size="default" data-testid="avatar">
            {data?.user.fullname}
          </Avatar>

          <Space.Compact direction="vertical" size="small">
            {/* Username */}
            <Text
              style={{
                fontWeight: "700",
                fontSize: "14px",
                color: "black",
              }}
            >
              {data?.user.fullname}
            </Text>

            {/* User Roles */}
            <Text
              style={{
                fontSize: "12px",
                fontWeight: "bold",
                color: "rgba(0, 0, 0, 0.3)",
              }}
            >
              {data?.user.role.name}
            </Text>
          </Space.Compact>
        </Flex>
        <DownOutlined style={!isMobile ? { marginTop: "-15px", marginLeft: "10px" } : undefined} />
      </Flex>
    </Dropdown>
  );
};

export default UserProfile;
