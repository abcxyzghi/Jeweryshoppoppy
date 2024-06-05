import {
  Button,
  DatePicker,
  Form,
  Input,
  Modal,
  Popconfirm,
  Row,
  Table,
} from "antd";
import { useEffect, useState } from "react";
import api from "../../../config/axios";
import { useForm } from "antd/es/form/Form";
import { toast } from "react-toastify";
import { QuestionCircleOutlined } from "@ant-design/icons";
import moment from "moment";
import { formatDistance } from "date-fns";
export const ManageVoucher = () => {
  const [categories, setCategories] = useState([]);
  const [showModal, setShowModal] = useState(-2);
  const [loading, setLoading] = useState(true);
  const [form] = useForm();
  const fetchCategory = async () => {
    const response = await api.get(`/voucher`);
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
      title: "Code",
      dataIndex: "code",
      key: "code",
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
      title: "Start at",
      dataIndex: "startAt",
      key: "startAt",
      render: (value) => moment(value).format("YYYY-MM-DD HH:mm:ss"),
    },
    {
      title: "End At",
      dataIndex: "endAt",
      key: "endAt",
      render: (value) => moment(value).format("YYYY-MM-DD HH:mm:ss"),
    },
    {
      title: "Update at",
      dataIndex: "createAt",
      key: "createAt",
      render: (value) =>
        formatDistance(new Date(value), new Date(), { addSuffix: true }),
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
            title="Delete the voucher"
            description="Are you sure to delete this voucher?"
            icon={<QuestionCircleOutlined style={{ color: "red" }} />}
            onConfirm={async () => {
              await api.delete(`/voucher/${value}`).then(() => {
                toast.success("Voucher deleted");
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
      await api.put(`/voucher/${categories[showModal].id}`, values);
      toast.success("Successfully update voucher");
    } else {
      await api.post("/voucher", values);
      toast.success("Successfully created new voucher");
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
      form.setFieldsValue({
        ...categories[showModal],
        startAt: moment(categories[showModal].startAt),
        endAt: moment(categories[showModal].endAt),
        createAt: moment(categories[showModal].createAt),
      });
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
        Add new voucher
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
            label="Code"
            name="code"
            rules={[{ required: true, message: "Please input code!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Start At"
            name="startAt"
            rules={[{ required: true, message: "Please select start date!" }]}
          >
            <DatePicker showTime />
          </Form.Item>
          <Form.Item
            label="End At"
            name="endAt"
            rules={[{ required: true, message: "Please select end date!" }]}
          >
            <DatePicker showTime />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};
