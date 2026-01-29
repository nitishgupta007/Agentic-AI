// src/App.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import PrivateRoute from "./components/PrivateRoute";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
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
