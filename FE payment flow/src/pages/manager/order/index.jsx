import {
  Button,
  Form,
  Input,
  Modal,
  Popconfirm,
  Row,
  Space,
  Table,
  Tag,
} from "antd";
import { useEffect, useState } from "react";
import api from "../../../config/axios";
import { useForm } from "antd/es/form/Form";
import { toast } from "react-toastify";
import { QuestionCircleOutlined } from "@ant-design/icons";
import moment from "moment";
import convertCurrency from "../../utils/currency";
import { formatDistance } from "date-fns";
export const ManageOrder = () => {
  const [categories, setCategories] = useState([]);
  const [showModal, setShowModal] = useState(-2);
  const [loading, setLoading] = useState(true);
  const [form] = useForm();
  const fetchCategory = async () => {
    const response = await api.get(`/order`);
    setCategories(response.data);
    setLoading(false);
  };

  useEffect(() => {
    fetchCategory();
  }, []);

  const columns = [
    {
      title: "Order Details",
      dataIndex: "orderDetails",
      key: "orderDetails",
      render: (orderDetails) => (
        <Space direction="vertical">
          {orderDetails.map((detail) => (
            <div key={detail.id}>
              <div>Product Name: {detail.product.name}</div>
              <div>Quantity: {detail.quantity}</div>
              <div>Price: {detail.product.price}</div>
            </div>
          ))}
        </Space>
      ),
    },
    {
      title: "Total Amount",
      dataIndex: "totalAmount",
      key: "totalAmount",
      render: (value) => convertCurrency(value),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag color={status === "DONE" ? "green" : "volcano"}>
          {status.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: "Created By",
      dataIndex: "createBy",
      key: "createBy",
      render: (createBy) => createBy.fullName,
    },
    {
      title: "Created At",
      dataIndex: "createAt",
      key: "createAt",
      render: (value) =>
        formatDistance(new Date(value), new Date(), { addSuffix: true }),
    },
  ];
  const onSubmit = async (values) => {
    if (categories[showModal]) {
      await api.put(`/category/${categories[showModal].id}`, values);
      toast.success("Successfully update category");
    } else {
      await api.post("/category", values);
      toast.success("Successfully created new category");
    }
    form.resetFields();
    setShowModal(-2);
    fetchCategory();
  };

  const handleTableChange = (pagination) => {
    fetchCategory(pagination.current);
  };

  useEffect(() => {
    console.log(showModal);
    if (showModal >= 0) {
      console.log(categories[showModal]);
      form.setFieldsValue(categories[showModal]);
    } else {
      form.resetFields();
    }
  }, [showModal]);

  return (
    <div>
      <Table
        loading={loading}
        dataSource={categories}
        columns={columns}
        onChange={handleTableChange}
      />
      <Modal
        open={showModal !== -2}
        title="Add category"
        onOk={() => form.submit()}
        onCancel={() => setShowModal(-2)}
      >
        <Form onFinish={onSubmit} form={form} labelCol={{ span: 24 }}>
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: "Please input name!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Description"
            name="description"
            rules={[{ required: true, message: "Please input description!" }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};
