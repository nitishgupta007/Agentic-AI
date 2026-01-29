import { Layout, Dropdown, Avatar, Space } from "antd";
import { UserOutlined, LogoutOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../features/auth/authSlice";

const { Header } = Layout;

export default function AppHeader() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const items = [
    {
      key: "profile",
      icon: <UserOutlined />,
      label: "Profile",
      onClick: () => navigate("/profile"),
    },
    {
      key: "logout",
      icon: <LogoutOutlined />,
      label: "Logout",
      onClick: () => {
        dispatch(logout());
        navigate("/login");
      },
    },
  ];

  return (
    <Header
      style={{
        background: "#fff",
        display: "flex",
        justifyContent: "flex-end",
        paddingRight: 24,
        boxShadow: "0 1px 4px rgba(0,0,0,0.1)",
      }}
    >
      <Dropdown menu={{ items }} placement="bottomRight">
        <Space style={{ cursor: "pointer" }}>
          <Avatar icon={<UserOutlined />} />
        </Space>
      </Dropdown>
    </Header>
  );
}
