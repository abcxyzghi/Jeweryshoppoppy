import React, { useEffect, useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  SettingOutlined,
  UserOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Avatar, Button, Dropdown, Layout, Menu, Space, theme } from "antd";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import getAccount from "../../pages/utils/account";
const { Header, Sider, Content } = Layout;
const Dashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const account = getAccount();
  console.log(account);

  const menu = (
    <Menu>
      <Menu.Item key="1" icon={<UserOutlined />}>
        Profile
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item
        key="3"
        icon={<LogoutOutlined />}
        onClick={() => {
          localStorage.removeItem("account");
          navigate("/login");
        }}
      >
        Logout
      </Menu.Item>
    </Menu>
  );

  useEffect(() => {
    const account = getAccount();
    if (!account) {
      // navigate("/login");
    }
  }, []);

  return (
    <Layout
      style={{
        height: "100vh",
      }}
    >
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[location.pathname]}
          items={[
            {
              key: "/dashboard/account",
              icon: <UserOutlined />,
              label: <Link to={"/dashboard/account"}>Manage Account</Link>,
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{ fontSize: "16px", width: 64, height: 64 }}
            />
            <Dropdown overlay={menu} placement="bottomRight">
              <Space style={{ marginRight: 24 }}>
                <Avatar icon={<UserOutlined />} />
                <span>{account?.name}</span>
              </Space>
            </Dropdown>
          </div>
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};
export default Dashboard;
