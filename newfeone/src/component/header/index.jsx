import { Layout, Menu, Dropdown, Avatar, Space } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/futures/userSlice";

const { Header } = Layout;

const AppHeader = () => {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const userMenu = (
    <Menu>
      {/* <Menu.Item key="0">
        <a href="/profile">Profile</a>
      </Menu.Item>
      <Menu.Item key="1">
        <a href="/settings">Settings</a>
      </Menu.Item>
      <Menu.Divider /> */}
      <Menu.Item
        key="3"
        onClick={() => {
          dispatch(logout());
        }}
      >
        Logout
      </Menu.Item>
    </Menu>
  );

  if (!user) return <></>;

  return (
    <Header
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "0 20px",
        backgroundColor: "white",
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
      }}
    >
      <div className="logo" style={{ color: "black", fontSize: "20px" }}>
        Jewery Store Poppy
      </div>
      <Dropdown overlay={userMenu} trigger={["hover"]}>
        <Space
          style={{
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
          }}
        >
          <Avatar icon={<UserOutlined />} />
          <span style={{ color: "black" }}>{user?.fullName}</span>
        </Space>
      </Dropdown>
    </Header>
  );
};

export default AppHeader;
