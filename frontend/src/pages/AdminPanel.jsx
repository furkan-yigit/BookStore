import React from "react";
import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

const AdminPanel = () => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (user.role !== "admin") {
    return <Navigate to="/" />;
  }

  return (
    <div>
      <h1>Admin Panel</h1>
      <p>Welcome, {user.email}!</p>
    </div>
  );
};

export default AdminPanel;
