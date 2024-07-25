/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import api from "../../../config/axios";
import "./index.scss";
import {
  Alert,
  Button,
  Card,
  Col,
  Descriptions,
  Input,
  InputNumber,
  List,
  Modal,
  Radio,
  Row,
  Spin,
  Table,
  Tabs,
} from "antd";
import Meta from "antd/es/card/Meta";
import convertCurrency from "../../utils/currency";
import { toast } from "react-toastify";
import ManageAccount from "../../admin/account";
import ManageCustomer from "../customer";
import { PlusOutlined, MinusOutlined } from "@ant-design/icons";
import Title from "antd/es/typography/Title";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
function Pos() {
  const user = useSelector((store) => store.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (user.role !== "STAFF") {
      navigate("/login");
    }
  }, []);

  const [categories, setCategories] = useState([]);
  const [inputPoint, setInputPoint] = useState(0);
  const [selectedPoint, setSelectedPoint] = useState(0);
  const [loading, setLoading] = useState(true);
  const [orderDetails, setOrderDetails] = useState([]);
  const [modalCustomer, setModalCustomer] = useState(false);
  const [modalVoucher, setModalVoucher] = useState(false);
  const [customer, setCustomer] = useState(null);
  const [voucher, setVoucher] = useState([]);
  const [voucherSearch, setVoucherSearch] = useState("");
  const [selectedVoucher, setSelectedVoucher] = useState(null);
  const [loadVoucher, setLoadVoucher] = useState(false);
  const [isNotFoundVoucher, setIsNotFoundVoucher] = useState(false);
  const [isCheckOut, setIsCheckOut] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const location = useLocation();

  const onChange = (key) => {
    console.log(key);
  };

  const fetchCategory = async () => {
    const response = await api.get(`/category`);
    console.log(response.data);
    setCategories(response.data);
    setLoading(false);
  };

  const fetchVoucher = async () => {
    const response = await api.get(`/voucher`);
    console.log(response.data);
    setVoucher(response.data);
  };

  useEffect(() => {
    console.log(orderDetails);
  }, [orderDetails]);

  const addToCard = (product, size) => {
    const index = orderDetails.findIndex(
      (c) => c.product.id === product.id && c.size.id === size.id
    );
    console.log(index);

    if (index === -1) {
      setOrderDetails([
        ...orderDetails,
        {
          product,
          quantity: 1,
          size: size,
        },
      ]);
      return;
    }

    orderDetails[index].quantity += 1;
    console.log(orderDetails);
    setOrderDetails([...orderDetails]);
  };

  const removeFromCard = (index) => {
    orderDetails.splice(index, 1);
    setOrderDetails([...orderDetails]);
  };

  const changeQuantity = (index, newQuantity) => {
    orderDetails[index].quantity = newQuantity;
    setOrderDetails([...orderDetails]);
  };

  useEffect(() => {
    if (location && location.search) {
      const query = new URLSearchParams(location.search);
      const orderId = query.get("orderId");
      const status = query.get("vnp_TransactionStatus");

      if (orderId) {
        if (status !== "00") {
          toast.error("Payment failed!");
          api.patch(`order/${orderId}?orderStatus=${"PAYMENT_FAIL"}`);
        } else {
          toast.success("Payment sucessfully!");
          api.patch(`order/${orderId}?orderStatus=${"PAID"}`);
        }
      }
    }
  }, [location]);

  const calcTotal = () => {
    console.log(selectedPoint);
    let total = 0;
    let discount = 0;
    orderDetails.forEach((item) => {
      total += item.product.price * item.quantity;
    });
    if (selectedVoucher) {
      discount = (total * selectedVoucher.value) / 100;
    }
    if (selectedPoint) {
      discount += (selectedPoint / 100) * total;
    }
    return total - discount;
  };

  const checkout = async () => {
    if (!customer) {
      toast.error("Please add customer information!!!");
      return;
    }

    const payload = orderDetails.map((item) => {
      console.log(item);
      return {
        productId: item.product.id,
        quantity: item.quantity,
        sizeId: item.size.id,
      };
    });

    try {
      setIsCheckOut(true);
      const response = await api.post("order/recharge", {
        orderDetailRequests: payload,
        customerId: customer?.id,
        voucherId: selectedVoucher?.id,
        point: selectedPoint,
      });
      console.log(response.data);
      window.location.href = response.data.replaceAll(" ", "");
      setOrderDetails([]);
      toast.success("Successfully created order!");
    } catch (err) {
      console.log(err);
      toast.error(err.response.data);
      setIsCheckOut(false);
    }
  };

  useEffect(() => {
    fetchCategory();
    fetchVoucher();
  }, []);

  return (
    <Row className="pos">
      <Col span={16} className="pos__product">
        <Card className="card">
          <Tabs
            onChange={onChange}
            type="card"
            items={categories.map((category) => {
              const id = String(category.id);
              return {
                label: category.name,
                key: id,
                children: <ProductPos categoryId={id} addToCard={addToCard} />,
              };
            })}
          />
        </Card>
      </Col>
      <Col span={8} className="pos__checkout">
        <Card className="card">
          <Row align={"middle"}>
            <Col span={12}>
              <h1>Order</h1>
            </Col>
            <Col span={12}>
              <Link to="/staff/buy">Mua lại</Link>
            </Col>
          </Row>
          <hr
            style={{
              marginBottom: 20,
            }}
          />
          {orderDetails.map((item, index) => (
            <Row
              align={"middle"}
              gutter={[12, 12]}
              style={{
                margin: "15px 0",
              }}
            >
              <Col span={8}>
                <strong
                  style={{
                    textTransform: "uppercase",
                  }}
                >
                  {item.product.name} {item.size && `(${item?.size?.name})`}
                </strong>
              </Col>

              <Col span={4}>
                <Row>
                  <Col span={8}>
                    <PlusOutlined
                      onClick={() => {
                        changeQuantity(index, item.quantity + 1);
                      }}
                    />
                  </Col>
                  <Col span={8}>{item.quantity}</Col>
                  <Col span={8}>
                    <MinusOutlined
                      onClick={() => {
                        if (item.quantity === 1) {
                          removeFromCard(item);
                        } else {
                          changeQuantity(index, item.quantity - 1);
                        }
                      }}
                    />
                  </Col>
                </Row>
              </Col>

              <Col span={6}>
                {convertCurrency(item.product.price * item.quantity)}
              </Col>
              <Col span={6}>
                <Button
                  danger
                  type="primary"
                  onClick={() => removeFromCard(index)}
                >
                  Delete
                </Button>
              </Col>
            </Row>
          ))}

          {orderDetails.length > 0 ? (
            <>
              <div className="member" onClick={() => setModalCustomer(true)}>
                {customer ? (
                  <h4>
                    {customer.fullName} - {customer.phone}
                  </h4>
                ) : (
                  "Thông tin khách hàng"
                )}
              </div>
              <Modal
                width={1200}
                title="Thông tin khách hàng"
                open={modalCustomer}
                onCancel={() => setModalCustomer(false)}
              >
                {/* <Table columns={customerColumns} dataSource={[]} /> */}
                <ManageCustomer
                  handleSelectCustomer={(record) => {
                    setCustomer(record);
                    setModalCustomer(false);
                  }}
                />
              </Modal>
              <div className="member" onClick={() => setModalVoucher(true)}>
                {selectedVoucher ? (
                  <h4>
                    {selectedVoucher.code} - ${selectedVoucher.value}%
                  </h4>
                ) : (
                  "Mã khuyến mãi"
                )}
              </div>
              <Modal
                width={1200}
                title="Nhập voucher"
                open={modalVoucher}
                onCancel={() => setModalVoucher(false)}
                footer={null}
              >
                <Row gutter={12}>
                  <Col span={22}>
                    <Input
                      value={voucherSearch}
                      onChange={(e) => setVoucherSearch(e.target.value)}
                      placeholder="Code"
                      width={100}
                    />
                  </Col>
                  <Col span={2}>
                    <Button
                      type="primary"
                      onClick={async () => {
                        setLoadVoucher(true);
                        const response = await api.get(
                          `voucher?code=${voucher}`
                        );
                        setLoadVoucher(false);

                        if (response.data.length === 0) {
                          setIsNotFoundVoucher(true);
                        } else {
                          setIsNotFoundVoucher(false);
                          setSelectedVoucher(response.data[0]);
                        }
                      }}
                    >
                      Search
                    </Button>
                  </Col>
                </Row>
                {loadVoucher && <Spin />}
                {voucher.filter((item) =>
                  item.code.toLowerCase().includes(voucherSearch.toLowerCase())
                ).length === 0 && (
                  <Alert
                    message="Voucher not found"
                    type="error"
                    style={{
                      marginTop: 20,
                    }}
                  />
                )}

                {voucher
                  .filter((item) =>
                    item.code
                      .toLowerCase()
                      .includes(voucherSearch.toLowerCase())
                  )
                  .map((item) => (
                    <Card
                      bordered={true}
                      style={{
                        width: "100%",
                        margin: "20px auto",
                        backgroundColor: "#ededed",
                      }}
                      onClick={() => {
                        setSelectedVoucher(item);
                        setModalVoucher(false);
                      }}
                    >
                      <Title level={4}>Discount Details</Title>
                      <Descriptions column={2}>
                        <Descriptions.Item label="ID">
                          {item.id}
                        </Descriptions.Item>
                        <Descriptions.Item label="Code">
                          {item.code}
                        </Descriptions.Item>
                        <Descriptions.Item label="Start At">
                          {new Date(item.startAt).toLocaleString()}
                        </Descriptions.Item>
                        <Descriptions.Item label="End At">
                          {new Date(item.endAt).toLocaleString()}
                        </Descriptions.Item>
                        <Descriptions.Item label="Created At">
                          {new Date(item.createAt).toLocaleString()}
                        </Descriptions.Item>
                        <Descriptions.Item label="Value">
                          {item.value}%
                        </Descriptions.Item>
                      </Descriptions>
                    </Card>
                  ))}
              </Modal>
              <hr
                style={{
                  marginBottom: 20,
                }}
              />
              {customer?.point > 0 && (
                <Row gutter={12}>
                  <Col span={16}>
                    <InputNumber
                      value={inputPoint}
                      onChange={(e) => setInputPoint(e)}
                      max={customer.point}
                      style={{
                        width: "100%",
                        marginBottom: 10,
                      }}
                    />
                  </Col>
                  <Col span={8}>
                    <Button
                      style={{
                        width: "100%",
                      }}
                      type="primary"
                      onClick={() => setSelectedPoint(inputPoint)}
                    >
                      Áp dụng điểm
                    </Button>
                  </Col>
                </Row>
              )}
              <Row align={"middle"}>
                <Col span={12}>Total</Col>
                <Col span={12}>
                  <h1>{convertCurrency(calcTotal())}</h1>
                </Col>
              </Row>
            </>
          ) : (
            <Alert message="No order yet!" type="info" />
          )}
          <Row
            justify={"center"}
            style={{
              marginTop: 20,
            }}
          >
            {orderDetails.length > 0 && (
              <Button
                type="primary"
                onClick={() => setShowConfirm(true)}
                className="button"
              >
                Checkout
              </Button>
            )}

            <Modal
              title="Xác nhận đơn hàng"
              visible={showConfirm}
              footer={
                <>
                  <Button onClick={() => setShowConfirm(false)}>Hủy</Button>
                  <Button type="primary" onClick={checkout}>
                    Xác nhận
                  </Button>
                </>
              }
            >
              <List
                itemLayout="horizontal"
                dataSource={orderDetails}
                renderItem={({ product, quantity, size }) => (
                  <List.Item>
                    <List.Item.Meta
                      avatar={
                        <img
                          src={product.image}
                          alt={product.name}
                          width={50}
                        />
                      }
                      title={product.name}
                      description={
                        <>
                          <p>Mô tả: {product.description}</p>
                          <p>
                            Giá:{" "}
                            {product.price.toLocaleString("vi-VN", {
                              style: "currency",
                              currency: "VND",
                            })}
                          </p>
                          <p>Số lượng: {quantity}</p>
                          <p>Kích thước: {size.name}</p>
                        </>
                      }
                    />
                  </List.Item>
                )}
              />
            </Modal>
          </Row>
        </Card>
      </Col>
    </Row>
  );
}

const ProductPos = ({ categoryId, addToCard }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const fetchProduct = async () => {
    const response = await api.get(`/product/category/${categoryId}`);
    setProducts(response.data);
    setLoading(false);
  };

  useEffect(() => {
    fetchProduct();
  }, [categoryId]);

  return (
    <div>
      {loading ? (
        <Row
          className="spin"
          justify="center"
          align="middle"
          style={{ minHeight: "100%" }}
        >
          <Col>
            <Spin />
          </Col>
        </Row>
      ) : (
        <ProductList
          products={products}
          addToCard={addToCard}
          fetchProduct={fetchProduct}
        />
      )}
    </div>
  );
};

const ProductList = ({ products, addToCard, fetchProduct }) => {
  const [keyWord, setKeyWord] = useState("");
  if (products.length === 0) {
    return (
      <Alert message="No product available for this category!" type="info" />
    );
  }

  return (
    <>
      <Row
        justify={"end"}
        style={{
          marginBottom: 10,
        }}
      >
        <Col span={8}>
          <Row gutter={12}>
            <Col span={24}>
              <Input
                value={keyWord}
                onChange={(e) => setKeyWord(e.target.value)}
                placeholder="Product Name"
              />
            </Col>
          </Row>
        </Col>
      </Row>
      <Row gutter={[12, 12]} style={{ display: "flex", flexWrap: "wrap" }}>
        {products
          .filter((product) =>
            product.name.toLowerCase().includes(keyWord.toLowerCase())
          )
          .map((product) => (
            <Col span={12} key={product.id}>
              <CardDetail product={product} addToCard={addToCard} />
            </Col>
          ))}
      </Row>
    </>
  );
};

const CardDetail = ({ product, addToCard }) => {
  const [isOpen, setOpen] = useState(false);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedName, setSelectedName] = useState(null);

  return (
    <>
      <Card
        hoverable
        style={{
          width: "100%",
          flex: 1,
        }}
        onClick={() => setOpen(true)}
        cover={
          <img
            style={{
              height: 200,
              objectFit: "cover",
              objectPosition: "center",
            }}
            alt="example"
            src={
              product.image
                ? product.image
                : "https://caohungdiamond.com/wp-content/uploads/2022/06/z3657486228938_d12cba988ad3990e300674fb57e72449.jpg"
            }
          />
        }
      >
        <Meta
          title={`${product.name} (${convertCurrency(product.price)}) [${
            product.code
          }]`}
          // description={product.description}
        />
      </Card>
      <Modal
        footer={null}
        open={isOpen}
        onCancel={() => setOpen(false)}
        width={1000}
      >
        <Row gutter={12}>
          <Col span={12}>
            <img
              style={{
                width: "100%",
              }}
              src={
                product.image
                  ? product.image
                  : "https://caohungdiamond.com/wp-content/uploads/2022/06/z3657486228938_d12cba988ad3990e300674fb57e72449.jpg"
              }
              alt=""
            />
          </Col>
          <Col
            span={12}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 20,
            }}
          >
            <h1>{product.name}</h1>
            <h2>
              Code: {product.code} ({product.quantity} left)
            </h2>
            <p> {product.description}</p>
            <h3>{convertCurrency(product.price)}</h3>
            <div>
              <h4>Chọn size:</h4>
              {product.sizes.map((size) => {
                return (
                  <Radio.Group
                    key={size.id}
                    value={selectedSize}
                    name="size"
                    onChange={(e) => {
                      console.log(e);
                      setSelectedSize(e.target.value);
                      setSelectedName(
                        product.sizes.filter(
                          (item) => item.id === e.target.value
                        )[0]
                      );
                    }}
                  >
                    <Radio value={size.id}>
                      {size.name} ({size.description})
                    </Radio>
                  </Radio.Group>
                );
              })}
            </div>
            <Button
              type="primary"
              onClick={() => {
                if (selectedSize) {
                  if (product.quantity > 0) {
                    addToCard(product, selectedName);
                    setSelectedSize("");
                    setSelectedName("");
                    setOpen(false);
                  } else {
                    toast.error("Sản phẩm hết hàng!");
                  }
                } else {
                  toast.error("Nhập size để bỏ vào giỏ hàng!");
                }
              }}
            >
              Add to card
            </Button>
          </Col>
        </Row>
      </Modal>
    </>
  );
};

export default Pos;
