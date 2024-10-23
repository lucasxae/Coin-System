import React, { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../src/context/AuthContext";

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated } = useAuth();

  return isAuthenticated() ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
