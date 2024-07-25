import {
  Button,
  Col,
  Form,
  Input,
  Modal,
  Popconfirm,
  Row,
  Select,
  Space,
  Table,
  Tag,
} from "antd";
import { useEffect, useState } from "react";
import api from "../../../config/axios";
import { toast } from "react-toastify";
import { QuestionCircleOutlined } from "@ant-design/icons";
import "./index.scss";
import convertCurrency from "../../utils/currency";
import { formatDistance } from "date-fns";
import moment from "moment";
import { Link } from "react-router-dom";
function Buy({}) {
  // const [isShowModal, setShowModal] = useState(false);
  const [showModal, setShowModal] = useState(-2);
  const [form] = Form.useForm();
  const [account, setAccount] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loading2, setLoading2] = useState(false);
  const [keyWord, setKeyWord] = useState("");
  const [selectedPhone, setSelectedPhone] = useState();
  const [order, setOrder] = useState([]);
  const [orderDetailsCheckOut, setOrderDetails] = useState([]);
  const [onCheckOut, setOnCheckOut] = useState(false);
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
        await api.post("register", {
          ...values,
          role: "CUSTOMER",
        });
        toast.success("Successfully create new account");
        setAccount([
          ...account,
          {
            ...values,
            role: "CUSTOMER",
          },
        ]);
      }
      // Handle form submission here
      form.resetFields();
      setShowModal(-2);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.log(err);
      toast.error(err.response.data);
    }
  };

  const fetchAccount = async () => {
    const response = await api.get("account?role=CUSTOMER");
    setAccount(response.data);
    setLoading(false);
  };

  const fetchOrder = async () => {
    setLoading2(true);
    const response = await api.get(`order?phone=${selectedPhone}`);
    setOrder(response.data.filter((order) => order.status === "PAID"));
    console.log(response.data);
    setLoading2(false);
  };

  useEffect(() => {
    fetchAccount();
  }, []);

  useEffect(() => {
    if (selectedPhone) {
      fetchOrder();
    }
  }, [selectedPhone]);

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
  ];

  const columnsOrder = [
    {
      title: "Order Details",
      dataIndex: "orderDetails",
      key: "orderDetails",
      render: (orderDetails) => (
        <Space direction="vertical">
          {orderDetails.map((detail) => (
            <div
              key={detail.id}
              style={{
                margin: "20px 0",
              }}
            >
              <div>
                Product Name: <strong>{detail.product.name}</strong>
              </div>
              <div>
                Quantity: <strong>{detail.quantity}</strong>
              </div>
              <div>
                Price: <strong>{convertCurrency(detail.product.price)}</strong>
              </div>
              {detail.guarantee && (
                <div>
                  Guarantee from{" "}
                  <strong>
                    {moment(detail.guarantee.startAt).format("DD/MM/yyyy")}{" "}
                  </strong>
                  to{" "}
                  <strong>
                    {moment(detail.guarantee.endAt).format("DD/MM/yyyy")}
                  </strong>
                </div>
              )}
              {detail.buyBack ? (
                <Tag color="green">Đã mua lại</Tag>
              ) : (
                <Button
                  danger
                  onClick={() => {
                    orderDetailsCheckOut.push({
                      ...detail,
                      product: {
                        ...detail.product,
                        price: detail.product.price * 0.7,
                      },
                    });
                    setOrderDetails([...orderDetailsCheckOut]);
                  }}
                >
                  Sell {detail.product.name}
                </Button>
              )}
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
      render: (status) => {
        let color;
        let label;

        switch (status) {
          case "PAID":
            color = "green";
            label = "PAID";
            break;
          case "NOT_YET_PAYMENT":
            color = "warning";
            label = "NOT_YET_PAYMENT";
            break;
          case "PAYMENT_FAIL":
            color = "red";
            label = "PAYMENT_FAIL";
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

  const calcTotal = () => {
    let total = 0;
    let discount = 0;
    orderDetailsCheckOut.forEach((item) => {
      total += item.product.price * item.quantity;
    });
    return total;
  };

  return (
    <Row>
      <Col span={16}>
        <div className="buy">
          <Row>
            <Col span={12}>
              <Row gutter={12}>
                <Col span={20}>
                  <Input
                    value={keyWord}
                    onChange={(e) => setKeyWord(e.target.value)}
                    placeholder="Phone, Email or Full Name"
                    width={100}
                  />
                </Col>
                <Col span={4}>
                  <Button
                    type="primary"
                    onClick={async () => {
                      setLoading(true);
                      const response = await api.get(
                        `account?keyWord=${keyWord}`
                      );
                      setAccount(response.data);
                      setLoading(false);
                    }}
                  >
                    Search
                  </Button>
                </Col>
              </Row>
            </Col>
          </Row>
          <Table
            pagination={{
              pageSize: 5,
            }}
            dataSource={account}
            columns={columns}
            loading={loading}
            onRow={(record) => {
              return {
                onClick: () => {
                  console.log(123);
                  setSelectedPhone(record.phone);
                },
              };
            }}
          />
          <Modal
            confirmLoading={loading}
            open={showModal !== -2}
            title="Create new account"
            onCancel={() => setShowModal(-2)}
            onOk={() => {
              form.submit();
            }}
          >
            <Form
              form={form}
              name="userForm"
              onFinish={onFinish}
              layout="vertical"
            >
              <Form.Item
                name="phone"
                label="Phone"
                rules={[
                  { required: true, message: "Please input phone number!" },
                ]}
              >
                <Input />
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
            </Form>
          </Modal>

          <Table columns={columnsOrder} dataSource={order} loading={loading2} />
        </div>
      </Col>
      <Col span={8}>
        <Row align={"middle"}>
          <Col span={12}>
            <h1>Order</h1>
          </Col>
          <Col span={12}>
            <Link to="/staff/pos">Bán sản phẩm</Link>
          </Col>
        </Row>
        <hr />
        {orderDetailsCheckOut.map((item) => {
          return (
            <div key={item.id} className="item">
              <Row align={"middle"}>
                <Col span={12}>
                  <div>
                    Product Name: <strong>{item.product.name}</strong>
                  </div>
                  <div>
                    Quantity: <strong>{item.quantity}</strong>
                  </div>
                  <div>
                    Price:{" "}
                    <strong>{convertCurrency(item.product.price)}</strong>
                  </div>
                </Col>
                <Col span={12}>
                  <Button
                    danger
                    onClick={() => {
                      setOrderDetails(
                        orderDetailsCheckOut.filter(
                          (detail) => detail.id !== item.id
                        )
                      );
                    }}
                  >
                    Remove
                  </Button>
                </Col>
              </Row>
            </div>
          );
        })}
        {orderDetailsCheckOut.length > 0 && (
          <>
            <Row align={"middle"}>
              <Col span={12}>Total</Col>
              <Col span={12}>
                <h1>{convertCurrency(calcTotal())}</h1>
              </Col>
            </Row>
            <Button
              loading={onCheckOut}
              className="button"
              type="primary"
              onClick={async () => {
                setOnCheckOut(true);
                const response = await api.post(`order-buy`, {
                  total: calcTotal(),
                  orderDetailId: orderDetailsCheckOut.map((item) => item.id),
                });
                setOnCheckOut(false);
                setOrderDetails([]);
                toast.success("Đã mua hàng thành công");
              }}
            >
              Checkout
            </Button>
          </>
        )}
      </Col>
    </Row>
  );
}

export default Buy;
