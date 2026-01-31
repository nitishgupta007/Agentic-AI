import { Form, Input, Button, Card, message } from "antd";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signup } from "../features/auth/authSlice";

export default function Signup() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      await dispatch(signup(values)).unwrap();

      message.success("Signup successful 🎉");

      setTimeout(() => {
        navigate("/login");
      }, 200);
    } catch (err) {
      message.error("Signup failed");
    }
  };

  return (
    <Card title="Signup" style={{ width: 400, margin: "100px auto" }}>
      <Form onFinish={onFinish}>
        <Form.Item name="name" rules={[{ required: true }]}>
          <Input placeholder="Name" />
        </Form.Item>

        <Form.Item name="email" rules={[{ required: true, type: "email" }]}>
          <Input placeholder="Email" />
        </Form.Item>

        <Form.Item name="password" rules={[{ required: true }]}>
          <Input.Password placeholder="Password" />
        </Form.Item>

        <Button type="primary" htmlType="submit" block>
          Signup
        </Button>
      </Form>
    </Card>
  );
}
