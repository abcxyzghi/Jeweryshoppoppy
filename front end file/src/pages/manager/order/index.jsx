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
export const ManageOrder = () => {
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
    const response = await api.get(`/order${phone ? `?phone=${phone}` : ""}`);
    setCategories(response.data);
    setLoading(false);
    setIsSearching(false);
  };

  useEffect(() => {
    fetchCategory();
  }, []);

  const columns = [
    {
      title: "Chi tiết đơn hàng",
      dataIndex: "orderDetails",
      key: "orderDetails",
      render: (orderDetails) => (
        <Space direction="vertical">
          {orderDetails.map((detail) => (
            <div key={detail.id}>
              <div>
                Tên sản phẩm: <strong>{detail.product.name}</strong> (
                {detail?.size?.name})
              </div>
              <div>
                Số lượng: <strong>{detail.quantity}</strong>
              </div>
              <div>
                Giá: <strong>{convertCurrency(detail.product.price)}</strong>
              </div>
              {detail.guarantee && (
                <div>
                  Bảo hành từ ngày{" "}
                  <strong>
                    {moment(detail.guarantee.startAt).format("DD/MM/yyyy")}{" "}
                  </strong>
                  đến{" "}
                  <strong>
                    {moment(detail.guarantee.endAt).format("DD/MM/yyyy")}
                  </strong>
                </div>
              )}
            </div>
          ))}
        </Space>
      ),
    },
    {
      title: "Tổng số tiền",
      dataIndex: "totalAmount",
      key: "totalAmount",
      render: (value) => convertCurrency(value),
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        let color;
        let label;

        switch (status) {
          case "PAID":
            color = "green";
            label = "Đã thanh toán";
            break;
          case "NOT_YET_PAYMENT":
            color = "warning";
            label = "Chưa thanh toán";
            break;
          case "PAYMENT_FAIL":
            color = "red";
            label = "Thanh toán thất bại";
            break;
          default:
            color = "default"; // Optional: Default color if status doesn't match any case
            label = status.toUpperCase();
            break;
        }

        return <Tag color={color}>{label}</Tag>;
      },
    },
    {
      title: "Khách hàng",
      dataIndex: "createBy",
      key: "createBy",
      render: (createBy, record) => record?.customer?.fullName,
    },
    {
      title: "Tạo bởi",
      dataIndex: "createBy",
      key: "createBy",
      render: (createBy) => createBy.fullName,
    },
    {
      title: "Ngày tạo",
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
      <Row
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
      </Row>
      <Table loading={loading} dataSource={categories} columns={columns} />
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
