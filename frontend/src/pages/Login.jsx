import { Form, Input, Button, Card, Typography, notification } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../features/auth/authSlice";
import { useNavigate, Link } from "react-router-dom";

const { Text } = Typography;

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.auth);

  const onFinish = async (values) => {
    try {
      await dispatch(login(values)).unwrap(); // ✅ success
      navigate("/");
    } catch (err) {
      notification.error({
        message: "Login Failed",
        description:
          err?.message || "Invalid email or password",
        placement: "topRight",
      });
    }
  };

  return (
    <Card title="Login" style={{ width: 400, margin: "100px auto" }}>
      <Form onFinish={onFinish}>
        <Form.Item
          name="email"
          rules={[{ required: true, message: "Please enter email" }]}
        >
          <Input placeholder="Email" />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please enter password" }]}
        >
          <Input.Password placeholder="Password" />
        </Form.Item>

        <Button
          type="primary"
          htmlType="submit"
          block
          loading={loading}
        >
          Login
        </Button>

        <div style={{ marginTop: 16, textAlign: "center" }}>
          <Text>
            Don’t have an account? <Link to="/signup">Sign up</Link>
          </Text>
        </div>
      </Form>
    </Card>
  );
}
