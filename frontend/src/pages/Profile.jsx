import { Card } from "antd";
import { useSelector } from "react-redux";

export default function Profile() {
  const { user } = useSelector((state) => state.auth);

  return (
    <Card
      title="Profile"
      style={{ maxWidth: 500, margin: "40px auto" }}
    >
      <p><b>Name:</b> {user?.name}</p>
      <p><b>Email:</b> {user?.email}</p>
    </Card>
  );
}
