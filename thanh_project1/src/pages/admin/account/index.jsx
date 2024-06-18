import {
  Button,
  Form,
  Input,
  Modal,
  Popconfirm,
  Row,
  Select,
  Table,
  Tag,
} from "antd";
import { useEffect, useState } from "react";
import api from "../../../config/axios";
import { toast } from "react-toastify";
import { QuestionCircleOutlined } from "@ant-design/icons";
function ManageAccount() {
  // const [isShowModal, setShowModal] = useState(false);
  const [showModal, setShowModal] = useState(-2);
  const [form] = Form.useForm();
  const [account, setAccount] = useState([]);
  const [loading, setLoading] = useState(true);
  const onFinish = async (values) => {
    try {
      setLoading(true);
      console.log("Form values:", values);
      console.log(showModal);
      if (showModal >= 0) {
        const response = await api.put(
          `/account/${account[showModal].id}`,
          values
        );
        account[showModal] = response.data;
        setAccount([...account]);
      } else {
        await api.post("register", values);
        toast.success("Successfully create new account");
        setAccount([...account, values]);
      }
      // Handle form submission here
      form.resetFields();
      setShowModal(-2);
      setLoading(false);
    } catch (err) {
      console.log(err);
      toast.error(err.response.data);
    }
  };

  const fetchAccount = async () => {
    const response = await api.get("account");
    setAccount(response.data);
    setLoading(false);
  };

  useEffect(() => {
    fetchAccount();
  }, []);

  useEffect(() => {
    if (showModal >= 0) {
      form.setFieldsValue(account[showModal]);
      console.log(account[showModal]);
    } else {
      form.resetFields();
    }
  }, [showModal]);

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
      title: "status",
      dataIndex: "accountStatus",
      key: "accountStatus",
      render: (status) => (
        <Tag color={status === "DELETED" ? "red" : "green"}>
          {status ?? "ACTIVE"}
        </Tag>
      ),
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
      dataIndex: "id",
      key: "action",
      render: (value, record, index) => (
        <Row>
          <Button
            style={{
              marginRight: 10,
            }}
            type="primary"
            onClick={() => {
              console.log(index);
              setShowModal(index);
            }}
          >
            Edit
          </Button>
          {record.accountStatus !== "DELETED" && record.role !== "ADMIN" && (
            <Popconfirm
              placement="rightBottom"
              title="Delete the account"
              description="Are you sure to delete this account?"
              icon={<QuestionCircleOutlined style={{ color: "red" }} />}
              onConfirm={async () => {
                await api.delete(`/account/${value}`).then(() => {
                  toast.success("Account deleted");
                  account[index].accountStatus = "DELETED";
                  setAccount([...account]);
                });
              }}
            >
              <Button danger type="primary">
                Delete
              </Button>
            </Popconfirm>
          )}
        </Row>
      ),
    },
  ];
  return (
    <div>
      <Button
        onClick={() => {
          setShowModal(-1);
        }}
        type="primary"
        style={{
          marginBottom: 20,
        }}
      >
        Create new account
      </Button>
      <Table dataSource={account} columns={columns} loading={loading} />
      <Modal
        confirmLoading={loading}
        open={showModal !== -2}
        title="Create new account"
        onCancel={() => setShowModal(-2)}
        onOk={() => {
          form.submit();
        }}
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
            rules={
              showModal >= 1
                ? []
                : [{ required: true, message: "Please input password!" }]
            }
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
