import { Button, Form, Input, Row } from "antd";
import "./index.scss";
import api from "../../config/axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import AuthTemplate from "../../component/auth-template";
function Login() {
  const navigate = useNavigate();
  const onFinish = async (values) => {
    try {
      const response = await api.post("login", values);
      console.log(response.data);
      localStorage.setItem("account", JSON.stringify(response.data));
      if (response.data.role === "ADMIN") {
        navigate("/dashboard/account");
      }
      toast.success("Successfully logged in to system");
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
          label="Username"
          name="phone"
          rules={[
            {
              required: true,
              message: "Please input your username!",
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
          <Button htmlType="submit" type="primary">
            Login
          </Button>
        </Row>
      </Form>
    </AuthTemplate>
  );
}

export default Login;
