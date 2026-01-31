import { Form, Input, Button, Card, Alert } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/axiosInstance";

export default function ForgotPassword() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    const onFinish = async ({ email }) => {
        try {
            setLoading(true);
            setError(null);

            await axios.post("/auth/forgot-password", { email });

            navigate("/login", {
                replace: true,
                state: { resetSent: true },
            });
        } catch (err) {
            setError(
                err.response?.data?.detail ||
                "Something went wrong. Please try again."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card title="Forgot Password" style={{ width: 400, margin: "100px auto" }}>
            <Form onFinish={onFinish}>
                <Form.Item
                    name="email"
                    rules={[
                        { required: true, message: "Please enter email" },
                        { type: "email", message: "Invalid email format" },
                    ]}
                >
                    <Input placeholder="Enter your email" />
                </Form.Item>

                <Button type="primary" htmlType="submit" block loading={loading}>
                    Send Reset Link
                </Button>

                {error && (
                    <Alert
                        type="error"
                        showIcon
                        message={error}
                        style={{ marginTop: 16 }}
                    />
                )}
            </Form>
        </Card>
    );
}
