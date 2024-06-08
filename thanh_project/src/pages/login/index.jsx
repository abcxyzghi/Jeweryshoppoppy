import { Button, Form, Input, Row } from "antd";
import "./index.scss";
import api from "../../config/axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import AuthTemplate from "../../component/auth-template";
import { useState } from "react";
function Login() {
  const navigate = useNavigate();
  const [loadings, setLoadings] = useState(false);
  const onFinish = async (values) => {
    try {
      const response = await api.post("login", values);
      console.log(response.data);
      localStorage.setItem("account", JSON.stringify(response.data));
      localStorage.setItem("token", JSON.stringify(response.data.token));
      if (response.data.role === "ADMIN" || response.data.role === "MANAGER") {
        navigate("/dashboard");
      }
      toast.success("Successfully logged in to system");
      setLoadings(false);
    } catch (err) {
      setLoadings(false);
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
          label="Email or phone number"
          name="phone"
          rules={[
            {
              required: true,
              message: "Please input your email or phone number!",
            },
          ]}
        >
          <Input />
        </Form.Item>
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
        <Link to={"/forgot-password"}>Forgot password</Link>
        <Row justify={"center"}>
          <Button
            htmlType="submit"
            type="primary"
            onClick={() => setLoadings(true)}
            loading={loadings}
          >
            Login
          </Button>
        </Row>
      </Form>
    </AuthTemplate>
  );
}

export default Login;
