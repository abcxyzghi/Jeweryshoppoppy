import { Button, Form, Input, Modal, Popconfirm, Row, Table } from "antd";
import { useEffect, useState } from "react";
import api from "../../../config/axios";
import { useForm } from "antd/es/form/Form";
import { toast } from "react-toastify";
import { QuestionCircleOutlined } from "@ant-design/icons";
export const ManageCategory = () => {
  const [categories, setCategories] = useState([]);
  const [showModal, setShowModal] = useState(-2);
  const [loading, setLoading] = useState(true);
  const [form] = useForm();
  const fetchCategory = async () => {
    const response = await api.get(`/category`);
    setCategories(response.data);
    setLoading(false);
  };

  useEffect(() => {
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
            title="Delete the order"
            description="Are you sure to delete this order?"
            icon={<QuestionCircleOutlined style={{ color: "red" }} />}
            onConfirm={async () => {
              await api.delete(`/category/${value}`).then(() => {
                toast.success("Category deleted");
                fetchCategory();
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
      <Button
        type="primary"
        style={{
          marginBottom: 10,
        }}
        onClick={() => setShowModal(-1)}
      >
        Add new category
      </Button>
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
