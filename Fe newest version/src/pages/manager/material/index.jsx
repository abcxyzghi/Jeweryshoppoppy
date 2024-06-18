import {
  Button,
  Form,
  Input,
  InputNumber,
  Modal,
  Popconfirm,
  Row,
  Select,
  Table,
} from "antd";
import { useEffect, useState } from "react";
import api from "../../../config/axios";
import { useForm } from "antd/es/form/Form";
import { toast } from "react-toastify";
import { QuestionCircleOutlined } from "@ant-design/icons";
export const ManageProduct = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [showModal, setShowModal] = useState(-2);
  const [loading, setLoading] = useState(true);
  const [form] = useForm();
  const fetchProduct = async () => {
    const response = await api.get(`/product`);
    setProducts(response.data);
    setLoading(false);
  };

  const fetchCategory = async () => {
    const response = await api.get(`/category`);
    setCategories(response.data);
  };

  useEffect(() => {
    fetchProduct();
    fetchCategory();
  }, []);

  const columns = [
    {
      title: "STT(NO)",
      dataIndex: "id",
      key: "id",
      render: (value, record, index) => {
        return index + 1;
      },
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => (
        <div
          style={{
            maxWidth: 200,
          }}
        >
          {text}
        </div>
      ),
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      render: (text) => (
        <div
          style={{
            maxWidth: 400,
          }}
        >
          {text}
        </div>
      ),
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (text) => (
        <div
          style={{
            maxWidth: 400,
          }}
        >
          {text}
        </div>
      ),
    },
    {
      title: "Action",
      dataIndex: "id",
      key: "id",
      render: (value, record, index) => (
        <Row>
          <Button
            style={{
              marginRight: 10,
            }}
            type="primary"
            onClick={() => {
              setShowModal(index);
            }}
          >
            Edit
          </Button>
          <Popconfirm
            placement="rightBottom"
            title="Delete the product"
            description="Are you sure to delete this product?"
            icon={<QuestionCircleOutlined style={{ color: "red" }} />}
            onConfirm={async () => {
              await api.delete(`/product/${value}`).then(() => {
                toast.success("Category deleted");
                fetchProduct();
              });
            }}
          >
            <Button danger type="primary">
              Delete
            </Button>
          </Popconfirm>
        </Row>
      ),
    },
  ];

  const onSubmit = async (values) => {
    if (products[showModal]) {
      await api.put(`/product/${products[showModal].id}`, values);
      toast.success("Successfully update product");
    } else {
      await api.post("/product", values);
      toast.success("Successfully created new product");
    }
    form.resetFields();
    setShowModal(-2);
    fetchProduct();
  };

  const handleTableChange = (pagination) => {
    fetchProduct(pagination.current);
  };

  useEffect(() => {
    console.log(showModal);
    if (showModal >= 0) {
      console.log(products[showModal]);
      form.setFieldsValue(products[showModal]);
    } else {
      form.resetFields();
    }
  }, [showModal]);

  return (
    <div>
      <Button
        type="primary"
        style={{
          marginBottom: 10,
        }}
        onClick={() => setShowModal(-1)}
      >
        Add new product
      </Button>
      <Table
        loading={loading}
        dataSource={products}
        columns={columns}
        onChange={handleTableChange}
      />
      <Modal
        open={showModal !== -2}
        title="Add product"
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

          <Form.Item
            label="Price"
            name="price"
            rules={[{ required: true, message: "Please input price!" }]}
          >
            <InputNumber />
          </Form.Item>

          <Form.Item
            label="Category"
            name="categoryId"
            rules={[{ required: true, message: "Please input category!" }]}
          >
            <Select
              options={categories.map((category) => ({
                value: category.id,
                label: `${category.name} - ${category.description}`,
              }))}
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};
