// src/App.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import PrivateRoute from "./components/PrivateRoute";
import ForgotPassword from "./pages/ForgotPassword";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/signup" element={<Signup />} />

        <Route path="/" element={
          <PrivateRoute><Dashboard /></PrivateRoute>
        } />

        <Route path="/profile" element={
          <PrivateRoute><Profile /></PrivateRoute>
        } />
      </Routes>
    </BrowserRouter>
  );
}
