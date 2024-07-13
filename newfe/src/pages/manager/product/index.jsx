import {
  Button,
  Col,
  Form,
  Image,
  Input,
  InputNumber,
  Modal,
  Popconfirm,
  Row,
  Select,
  Table,
  Upload,
} from "antd";
import { useEffect, useState } from "react";
import api from "../../../config/axios";
import { useForm } from "antd/es/form/Form";
import { toast } from "react-toastify";
import { QuestionCircleOutlined } from "@ant-design/icons";
import convertCurrency from "../../utils/currency";
import { PlusOutlined } from "@ant-design/icons";
import uploadFile from "../../../utils/file";
export const ManageProduct = () => {
  const [products, setProducts] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [showModal, setShowModal] = useState(-2);
  const [loading, setLoading] = useState(true);
  const [form] = useForm();
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [keywords, setKeywords] = useState("");

  const [fileList, setFileList] = useState([]);
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
  };
  const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);
  const uploadButton = (
    <button
      style={{
        border: 0,
        background: "none",
      }}
      type="button"
    >
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </button>
  );
  const fetchProduct = async () => {
    const response = await api.get(`/product`);
    setProducts(response.data);
    setLoading(false);
  };

  const fetchsize = async () => {
    const response = await api.get(`/size`);
    setSizes(response.data);
  };

  const fetchCategory = async () => {
    const response = await api.get(`/category`);
    setCategories(response.data);
  };

  useEffect(() => {
    fetchProduct();
    fetchCategory();
    fetchsize();
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
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (value, record, index) => {
        return <Image src={value} width={100} />;
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
          {convertCurrency(text)}
        </div>
      ),
    },
    {
      title: "Category",
      dataIndex: "categoryId",
      key: "category",
      render: (text) => (
        <div
          style={{
            maxWidth: 400,
          }}
        >
          {categories.find((item) => item.id === text)?.name}
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
              setFileList([
                {
                  uid: "-2",
                  name: "image.png",
                  status: "done",
                  url: record.image,
                },
              ]);
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
    if (values.image?.file?.originFileObj) {
      values.image = await uploadFile(values.image.file.originFileObj);
    }
    console.log(values.image);

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

  const getBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  return (
    <div>
      <Row>
        <Col span={12}>
          <Button
            type="primary"
            style={{
              marginBottom: 10,
            }}
            onClick={() => setShowModal(-1)}
          >
            Add new product
          </Button>
        </Col>
        <Col span={12}>
          <Input
            value={keywords}
            onChange={(e) => setKeywords(e.target.value)}
            placeholder="Enter product name"
          />
        </Col>
      </Row>
      <Table
        loading={loading}
        dataSource={products.filter((item) =>
          item.name.toLowerCase().includes(keywords.toLowerCase())
        )}
        columns={columns}
        onChange={handleTableChange}
      />
      <Modal
        open={showModal !== -2}
        title="Add product"
        onOk={() => form.submit()}
        onCancel={() => {
          setShowModal(-2);
          setFileList([]);
        }}
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

          <Row gutter={12}>
            <Col span={12}>
              <Form.Item
                label="Price"
                name="price"
                rules={[{ required: true, message: "Please input price!" }]}
              >
                <InputNumber
                  style={{
                    width: "100%",
                  }}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Code"
                name="code"
                rules={[{ required: true, message: "Please input code!" }]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>

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

          <Form.Item
            label="Size"
            name="sizeIds"
            rules={[{ required: true, message: "Please input size!" }]}
          >
            <Select
              mode="multiple"
              allowClear
              style={{ width: "100%" }}
              options={sizes.map((item) => ({
                label: item.name,
                value: item.id,
              }))}
            />
          </Form.Item>
          <Form.Item label="Image" name="image">
            <Upload
              action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
              listType="picture-card"
              fileList={fileList}
              onPreview={handlePreview}
              onChange={handleChange}
              maxCount={1}
            >
              {fileList.length >= 8 ? null : uploadButton}
            </Upload>
          </Form.Item>
        </Form>
      </Modal>
      {previewImage && (
        <Image
          wrapperStyle={{
            display: "none",
          }}
          preview={{
            visible: previewOpen,
            onVisibleChange: (visible) => setPreviewOpen(visible),
            afterOpenChange: (visible) => !visible && setPreviewImage(""),
          }}
          src={previewImage}
        />
      )}
    </div>
  );
};
