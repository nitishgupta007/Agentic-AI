import { Form, Input, Button, Card, Typography } from "antd";
import { useDispatch } from "react-redux";
import { login } from "../features/auth/authSlice";
import { useNavigate, Link } from "react-router-dom";

const { Text } = Typography;

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onFinish = async (values) => {
    await dispatch(login(values)).unwrap();
    navigate("/");
  };

  return (
    <Card title="Login" style={{ width: 400, margin: "100px auto" }}>
      <Form onFinish={onFinish}>
        <Form.Item name="email" rules={[{ required: true }]}>
          <Input placeholder="Email" />
        </Form.Item>

        <Form.Item name="password" rules={[{ required: true }]}>
          <Input.Password placeholder="Password" />
        </Form.Item>

        <Button type="primary" htmlType="submit" block>
          Login
        </Button>

        {/* 🔥 Signup Redirect */}
        <div style={{ marginTop: 16, textAlign: "center" }}>
          <Text>
            Don’t have an account?{" "}
            <Link to="/signup">Sign up</Link>
          </Text>
        </div>
      </Form>
    </Card>
  );
}
