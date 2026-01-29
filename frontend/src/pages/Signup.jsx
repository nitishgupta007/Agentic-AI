// src/pages/Signup.jsx
import { Form, Input, Button, Card } from "antd";
import { useDispatch } from "react-redux";
import { signup } from "../features/auth/authSlice";

export default function Signup() {
  const dispatch = useDispatch();

  return (
    <Card title="Signup" style={{ width: 400, margin: "100px auto" }}>
      <Form onFinish={(v) => dispatch(signup(v))}>
        <Form.Item name="name" rules={[{ required: true }]}>
          <Input placeholder="Name" />
        </Form.Item>
        <Form.Item name="email" rules={[{ required: true }]}>
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
