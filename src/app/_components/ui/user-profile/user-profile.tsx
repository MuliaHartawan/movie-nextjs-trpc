import { Dropdown, Space, Flex, Modal, Avatar } from "antd";
import {
  DownOutlined,
  ExclamationCircleFilled,
  LogoutOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { logOut } from "@/libs/auth/login";
import { Session } from "next-auth";

export const UserProfile = ({ session }: { session?: Session | null }) => {
  const { confirm } = Modal;

  const fullname = session?.user?.fullname;

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
    >
      <Flex justify="center" align="center" onClick={(e) => e.preventDefault()}>
        <Space size="middle" align="start">
          <Flex gap={12} align="center" style={{ cursor: "pointer" }}>
            <Avatar size="default" style={{ backgroundColor: "green" }} data-testid="avatar">
              <UserOutlined size={24} />
            </Avatar>
            {fullname}
            <DownOutlined style={{ marginLeft: "10px" }} />
          </Flex>
        </Space>
      </Flex>
    </Dropdown>
  );
};
