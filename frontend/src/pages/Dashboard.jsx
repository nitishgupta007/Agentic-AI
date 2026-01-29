import { Layout } from "antd";
import AppHeader from "../components/AppHeader";

const { Content } = Layout;

export default function Dashboard() {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <AppHeader />

      <Content style={{ padding: 24 }}>
        <h1>Dashboard</h1>
        <p>Welcome to your dashboard 🚀</p>
      </Content>
    </Layout>
  );
}
