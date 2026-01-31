import { Navigate } from "react-router-dom";
import { getToken } from "../utils/tokenUtils";
import { Layout } from "antd";
import AppHeader from "./AppHeader";

export default function PrivateRoute({ children }) {
  const token = getToken();

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <AppHeader />
      {children}
    </Layout>
  );
}

