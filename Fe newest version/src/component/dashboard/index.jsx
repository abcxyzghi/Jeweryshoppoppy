import { useEffect, useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Avatar, Button, Dropdown, Layout, Menu, Space, theme } from "antd";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import getAccount from "../../pages/utils/account";
import AppHeader from "../header";
import PrivateRoute from "../private-route";
const { Header, Sider, Content } = Layout;
const Dashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
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

    if (account.role === "ADMIN") {
      setItems([
        {
          key: "/dashboard/account",
          icon: <UserOutlined />,
          label: <Link to={"/dashboard/account"}>Manage account</Link>,
        },
        {
          key: "/dashboard/category",
          icon: <UserOutlined />,
          label: <Link to={"/dashboard/category"}>Manage category</Link>,
        },
        {
          key: "/dashboard/voucher",
          icon: <UserOutlined />,
          label: <Link to={"/dashboard/voucher"}>Manage voucher</Link>,
        },
        {
          key: "/dashboard/product",
          icon: <UserOutlined />,
          label: <Link to={"/dashboard/product"}>Manage product</Link>,
        },
        {
          key: "/dashboard/order",
          icon: <UserOutlined />,
          label: <Link to={"/dashboard/order"}>Manage order</Link>,
        },
      ]);
    }

    if (account.role === "MANAGER") {
      setItems([
        {
          key: "/dashboard/category",
          icon: <UserOutlined />,
          label: <Link to={"/dashboard/category"}>Manage category</Link>,
        },
        {
          key: "/dashboard/voucher",
          icon: <UserOutlined />,
          label: <Link to={"/dashboard/voucher"}>Manage voucher</Link>,
        },
        {
          key: "/dashboard/product",
          icon: <UserOutlined />,
          label: <Link to={"/dashboard/product"}>Manage product</Link>,
        },
        {
          key: "/dashboard/order",
          icon: <UserOutlined />,
          label: <Link to={"/dashboard/order"}>Manage order</Link>,
        },
      ]);
    }
  }, []);

  return (
    <PrivateRoute>
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
            items={items}
          />
        </Sider>
        <Layout>
          <AppHeader />
          <Content
            style={{
              margin: "24px 16px",
              padding: 24,
              minHeight: 280,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
              overflow: "auto",
            }}
          >
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </PrivateRoute>
  );
};
export default Dashboard;
