import { Button, Form, Input, Row } from "antd";
import AuthTemplate from "../../component/auth-template";
import api from "../../config/axios";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";

function ResetPassword() {
  const navigate = useNavigate();
  const location = useLocation();
  const token = new URLSearchParams(location.search).get("token");
  const onFinish = async (values) => {
    try {
      const response = await await api.patch(
        "reset-password",
        {
          password: values.password,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response);
      toast.success("Successfully update password!");
      navigate("/login");
    } catch (err) {
      toast.error(err.response.data);
    }
  };
  return (
    <AuthTemplate>
      <Form
        onFinish={onFinish}
        labelCol={{
          span: 24,
        }}
      >
        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          label="Re-Password"
          name="repassword"
          dependencies={["password"]}
          rules={[
            {
              required: true,
              message: "Please confirm your password!",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("The two passwords do not match!")
                );
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Row justify={"center"}>
          <Button htmlType="submit" type="primary">
            Reset password
          </Button>
        </Row>
      </Form>
    </AuthTemplate>
  );
}

export default ResetPassword;
