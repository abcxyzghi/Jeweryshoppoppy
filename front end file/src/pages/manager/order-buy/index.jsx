import {
  Button,
  Col,
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
export const ManageOrderBuy = () => {
  const [categories, setCategories] = useState([]);
  const [showModal, setShowModal] = useState(-2);
  const [loading, setLoading] = useState(true);
  const [keyWord, setKeyWord] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [form] = useForm();
  const fetchCategory = async (phone) => {
    if (phone) {
      setIsSearching(true);
    } else {
      setLoading(true);
    }
    const response = await api.get(`/order-buy`);
    setCategories(response.data);
    setLoading(false);
    setIsSearching(false);
  };

  useEffect(() => {
    fetchCategory();
  }, []);

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Customer Name",
      dataIndex: "customer",
      key: "customer",
      render: (value, record) => record?.customer?.fullName,
    },
    {
      title: "Customer Phone",
      dataIndex: "customer",
      key: "customer",
      render: (value, record) => record?.customer?.phone,
    },
    {
      title: "Total",
      dataIndex: "total",
      key: "total",
      render: (value) => convertCurrency(value),
    },
    {
      title: "Order Details",
      dataIndex: "orderDetails",
      key: "orderDetails",
      render: (orderDetails) => (
        <ul>
          {orderDetails.map((item) => (
            <li key={item.id}>
              <b>Product:</b> {item.product.name} - {item.quantity} số lượng
            </li>
          ))}
        </ul>
      ),
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
      {/* <Row
        justify={"end"}
        style={{
          marginBottom: 10,
        }}
      >
        <Col span={8}>
          <Row gutter={12}>
            <Col span={18}>
              <Input
                value={keyWord}
                onChange={(e) => setKeyWord(e.target.value)}
                placeholder="Phone Number"
              />
            </Col>
            <Col span={6}>
              <Button
                type="primary"
                onClick={() => fetchCategory(keyWord)}
                loading={isSearching}
              >
                Search
              </Button>
            </Col>
          </Row>
        </Col>
      </Row> */}
      <Row
        justify={"end"}
        style={{
          marginBottom: 10,
        }}
      >
        <Input
          placeholder="Enter customer name or phone"
          value={keyWord}
          onChange={(e) => setKeyWord(e.target.value)}
        />
      </Row>
      <Table
        loading={loading}
        dataSource={categories.filter(
          (item) =>
            item?.customer?.fullName
              ?.toLowerCase()
              .includes(keyWord.toLowerCase()) ||
            item?.customer?.phone?.toLowerCase().includes(keyWord.toLowerCase())
        )}
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
            rules={[
              { required: true, message: "Please input name!" },
              {
                pattern: /^[A-Za-z\s]+$/,
                message: "Name cannot contain numbers!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Description"
            name="description"
            rules={[
              { required: true, message: "Please input description!" },
              {
                pattern: /^[A-Za-z\s]+$/,
                message: "Name cannot contain numbers!",
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};
