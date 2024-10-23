import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../src/context/AuthContext";

export const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated } = useAuth();

  return isAuthenticated() ? children : <Navigate to="/login" />;
};

export const UnauthenticatedRoute = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated } = useAuth();

  return isAuthenticated() ? <Navigate to="/" /> : children;
};
