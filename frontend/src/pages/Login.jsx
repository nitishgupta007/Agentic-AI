import { Form, Input, Button, Card, Typography, Alert } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { login, clearError } from "../features/auth/authSlice";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { useEffect } from "react";

const { Text } = Typography;

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { loading, error } = useSelector((state) => state.auth);
  const resetSent = location.state?.resetSent;

  // ✅ CORRECT auto-hide logic
  useEffect(() => {
    if (resetSent) {
      const timer = setTimeout(() => {
        navigate("/login", { replace: true, state: null });
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [resetSent, navigate]);

  const onFinish = async (values) => {
    try {
      await dispatch(login(values)).unwrap();
      navigate("/");
    } catch {
      // handled via redux
    }
  };

  return (
    <Card title="Login" style={{ width: 400, margin: "100px auto" }}>

      {resetSent && (
        <Alert
          type="success"
          showIcon
          message="If this email exists, a password reset link has been sent."
          style={{ marginBottom: 16 }}
        />
      )}

      <Form
        onFinish={onFinish}
        onValuesChange={() => dispatch(clearError())}
      >
        <Form.Item
          name="email"
          rules={[{ required: true, message: "Please enter email" }]}
        >
          <Input placeholder="Email" />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please enter password" }]}
          style={{ marginBottom: 1 }}
        >
          <Input.Password placeholder="Password" />
        </Form.Item>

        <Form.Item style={{ marginBottom: 4 }}>
          <div style={{ textAlign: "right" }}>
            <Link to="/forgot-password">Forgot password?</Link>
          </div>
        </Form.Item>

        <Button type="primary" htmlType="submit" block loading={loading}>
          Login
        </Button>

        {error && (
          <Alert
            message={error}
            type="error"
            showIcon
            style={{ marginTop: 16 }}
          />
        )}

        <div style={{ marginTop: 16, textAlign: "center" }}>
          <Text>
            Don’t have an account? <Link to="/signup">Sign up</Link>
          </Text>
        </div>
      </Form>
    </Card>
  );
}
