/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import api from "../../../config/axios";
import "./index.scss";
import { Alert, Button, Card, Col, Row, Spin, Tabs } from "antd";
import Meta from "antd/es/card/Meta";
import convertCurrency from "../../utils/currency";
import { toast } from "react-toastify";
function Pos() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [orderDetails, setOrderDetails] = useState([]);

  const onChange = (key) => {
    console.log(key);
  };

  const fetchCategory = async () => {
    const response = await api.get(`/category`);
    console.log(response.data);
    setCategories(response.data);
    setLoading(false);
  };

  const addToCard = (product) => {
    const index = orderDetails.findIndex((c) => c.product.id === product.id);
    console.log(index);

    if (index === -1) {
      setOrderDetails([
        ...orderDetails,
        {
          product,
          quantity: 1,
        },
      ]);
      return;
    }

    orderDetails[index].quantity += 1;

    setOrderDetails([...orderDetails]);
  };

  const removeFromCard = (index) => {
    orderDetails.splice(index, 1);
    setOrderDetails([...orderDetails]);
  };

  const calcTotal = () => {
    let total = 0;
    orderDetails.forEach((item) => {
      total += item.product.price * item.quantity;
    });
    return total;
  };

  const checkout = async () => {
    const payload = orderDetails.map((item) => {
      return {
        productId: item.product.id,
        quantity: item.quantity,
      };
    });

    try {
      const response = await api.post("order", {
        orderDetailRequests: payload,
      });
      setOrderDetails([]);
      toast.success("Successfully created order!");
    } catch (err) {
      toast.error(err.response.data);
    }
  };

  useEffect(() => {
    fetchCategory();
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
          <h1>Orders</h1>
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
              <Col span={10}>
                <strong
                  style={{
                    textTransform: "uppercase",
                  }}
                >
                  {item.product.name}
                </strong>
              </Col>
              <Col span={4}>{item.quantity}</Col>
              <Col span={4}>
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
              <hr
                style={{
                  marginBottom: 20,
                }}
              />
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
              <Button type="primary" onClick={checkout}>
                Checkout
              </Button>
            )}
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
        <ProductList products={products} addToCard={addToCard} />
      )}
    </div>
  );
};

const ProductList = ({ products, addToCard }) => {
  if (products.length === 0) {
    return (
      <Alert message="No product available for this category!" type="info" />
    );
  }

  return (
    <Row gutter={12}>
      {products.map((product) => (
        <Col span={6} key={product.id}>
          <Card
            hoverable
            style={{
              width: 240,
            }}
            cover={
              <img
                style={{
                  height: 200,
                  objectFit: "cover",
                  objectPosition: "center",
                }}
                alt="example"
                src="https://caohungdiamond.com/wp-content/uploads/2022/06/z3657486228938_d12cba988ad3990e300674fb57e72449.jpg"
              />
            }
            onClick={() => addToCard(product)}
          >
            <Meta title={product.name} description={product.description} />
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default Pos;
