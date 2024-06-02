import { Button, Form, Input, Modal, Select, Space, Table, Tag } from "antd";
import { useEffect, useState } from "react";
import api from "../../../config/axios";
import { toast } from "react-toastify";

function ManageAccount() {
  const [isShowModal, setShowModal] = useState(false);
  const [form] = Form.useForm();
  const [account, setAccount] = useState([]);

  const onFinish = async (values) => {
    try {
      console.log("Form values:", values);
      await api.post("register", values);
      // Handle form submission here

      form.resetFields();
      setShowModal(false);
      fetchAccount();
      toast.success("Successfully create new account");
    } catch (err) {
      toast.error(err.response.data);
    }
  };

  const fetchAccount = async () => {
    const response = await api.get("account");
    setAccount(response.data);
  };

  useEffect(() => {
    fetchAccount();
  }, []);

  const dataSource = [
    {
      key: "1",
      name: "Mike",
      age: 32,
      address: "10 Downing Street",
    },
    {
      key: "2",
      name: "John",
      age: 42,
      address: "10 Downing Street",
    },
  ];

  const columns = [
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Password",
      dataIndex: "password",
      key: "password",
    },
    {
      title: "Full Name",
      dataIndex: "fullName",
      key: "fullName",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      render: (role) => (
        <Tag color={role === "ADMIN" ? "red" : "blue"}>
          {role?.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <a>Edit</a>
          <a>Delete</a>
        </Space>
      ),
    },
  ];
  return (
    <div>
      <Button
        onClick={() => {
          setShowModal(true);
        }}
        type="primary"
        style={{
          marginBottom: 20,
        }}
      >
        Create new account
      </Button>
      <Table dataSource={account} columns={columns} />
      <Modal
        open={isShowModal}
        title="Create new account"
        onCancel={() => setShowModal(false)}
        onOk={() => form.submit()}
      >
        <Form form={form} name="userForm" onFinish={onFinish} layout="vertical">
          <Form.Item
            name="phone"
            label="Phone"
            rules={[{ required: true, message: "Please input phone number!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="password"
            label="Password"
            rules={[{ required: true, message: "Please input password!" }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="fullName"
            label="Full Name"
            rules={[{ required: true, message: "Please input full name!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: "Please input email!" },
              { type: "email", message: "Please enter a valid email!" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="role"
            label="Role"
            rules={[{ required: true, message: "Please select a role!" }]}
          >
            <Select>
              <Select.Option value="MANAGER">Manager</Select.Option>
              <Select.Option value="STAFF">Staff</Select.Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default ManageAccount;
