import { Card, Button, Form, Input, Select, message } from "antd";
import { useEffect, useState } from "react";
import axios from "../api/axiosInstance";

export default function Profile() {
  const [form] = Form.useForm();
  const [edit, setEdit] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    const res = await axios.get("/profile/me");
    form.setFieldsValue(res.data);
  };

  const handleEditClick = () => {
    setEdit(true);
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      const values = form.getFieldsValue();
      await axios.post("/profile/update_profile", values);
      message.success("Profile updated successfully");
      setEdit(false);
    } catch (err) {
      message.error("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card title="My Profile" style={{ maxWidth: 500, margin: "40px auto" }}>
      <Form form={form} layout="vertical">
        <Form.Item label="Name" name="name">
          <Input disabled={!edit} />
        </Form.Item>

        <Form.Item label="Gender" name="gender">
          <Select disabled={!edit} allowClear>
            <Select.Option value="male">Male</Select.Option>
            <Select.Option value="female">Female</Select.Option>
            <Select.Option value="other">Other</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item label="Age" name="age">
          <Input type="number" disabled={!edit} />
        </Form.Item>

        {edit ? (
          <Button
            type="primary"
            onClick={handleSave}
            loading={loading}
            block
          >
            Save Changes
          </Button>
        ) : (
          <Button block onClick={handleEditClick}>
            Edit Profile
          </Button>
        )}
      </Form>
    </Card>
  );
}
